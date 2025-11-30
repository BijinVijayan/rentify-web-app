import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Host, { IHost } from '@/database/models/Host';
import HostInitializer from '@/components/HostInitializer';
import DashboardClientLayout from '@/components/dashboard/DashboardClientLayout';

export default async function AdminLayout({
                                              children,
                                          }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/signin');
    }

    await connectDB();

    const hostProfile = await Host.findOne({ email: session.user.email }).lean<IHost>();

    if (!hostProfile) {
        redirect('/create-host');
    }

    const serializedHost = {
        ...hostProfile,
        _id: hostProfile._id.toString(),
        createdAt: hostProfile.createdAt?.toISOString(),
        updatedAt: hostProfile.updatedAt?.toISOString(),
    };

    return (
        <>
            <HostInitializer host={serializedHost} />
            <DashboardClientLayout>{children}</DashboardClientLayout>
        </>
    );
}
