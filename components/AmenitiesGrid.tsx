
import { AmenityGroup } from "@/types/property";

type Props = {
    amenityGroups: AmenityGroup[];
};

export default function AmenitiesGrid({ amenityGroups }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {amenityGroups.map(group => (
                <div key={group.group}>
                    <div className="font-semibold mb-3 accent-slate-800">{group.group}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                        {group.amenities.map(a => (
                            <div key={a.name} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="text-xl text-primary-color">{a.icon}</span>
                                <span className={"text-gray-text"}>{a.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
