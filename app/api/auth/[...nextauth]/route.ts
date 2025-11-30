// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";
import connectDB from "@/lib/mongodb";
import Host from "@/database/models/Host";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin', // Update if your login page path is different
    },
    callbacks: {
        async signIn({ user }) {
            // 1. If no email, deny
            if (!user.email) return false;

            try {
                // 2. Connect to Mongoose
                await connectDB();

                // 3. Check if this user exists in your "Host" collection
                const hostProfile = await Host.findOne({ email: user.email });

                if (hostProfile) {
                    // CASE A: User is a Host -> Return true to allow normal redirect (to dashboard)
                    return true;
                } else {
                    // CASE B: User is NOT a Host -> Return URL string to force redirect
                    // We add ?notification=new_host so the frontend knows to show a toast
                    return '/create-host?notification=new_host';
                }
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Deny login on error
            }
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };