
import {ApiAmenityGroup} from "@/types/property";

type Props = {
    amenityGroups: ApiAmenityGroup[];
};

export default function AmenitiesGrid({ amenityGroups }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {amenityGroups.map(group => (
                <div key={group.group}>
                    <div className="font-semibold mb-3 accent-slate-800">{group.group}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                        {group.items.map(a => (
                            <div key={a.label} className="flex items-center gap-2 text-sm text-gray-700">
                                <i className={`text-xl text-primary-color ${a.icon}`}></i>
                                <span className={"text-gray-text"}>{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
