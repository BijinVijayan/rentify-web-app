import { LocationMapProps } from "@/types/property";

export default function LocationMap({ location }: LocationMapProps) {
    const { lat, lng, address } = location;

    const delta = 0.02;
    const mUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

    return (
        <div className={"my-2 sm:rounded-lg"} style={{ width: "100%", height: "300px", overflow: "hidden" }}>
            <iframe
                src={mUrl}
                style={{ width: "100%", height: "100%" }}
                title={address}
                allowFullScreen
            />
        </div>
    );
}
