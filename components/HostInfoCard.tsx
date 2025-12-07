import Image from "next/image";
import {ApiHostDetails, Host} from "@/types/property";

type Props = {
    host: ApiHostDetails;
    onMessage?: () => void;
};
export default function HostInfoCard({ host, onMessage }: Props) {
    return (
        <div className={"bg-white sm:rounded sm:shadow p-4 space-y-3 mx-auto max-w-[380px]"}>
            <div className=" flex items-center gap-4 ">
                <Image src={host.avatarUrl} className="w-14 h-14 rounded-full" width={500} height={500} alt={""} />
                <div>
                    <div className="font-semibold">{host.fullName}</div>
                    <div className="text-xs text-gray-500">Host, Member since {new Date(host.memberSince).getFullYear()}</div>
                </div>
            </div>
            <button onClick={onMessage} className="cursor-pointer mt-3 w-full border border-slate-300 py-3 px-2 rounded-lg text-sm font-semibold">
                Message Host
            </button>
        </div>

    );
}
