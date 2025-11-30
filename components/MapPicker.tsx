"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerProps {
    lat: number;
    lng: number;
    onLocationSelect: (lat: number, lng: number) => void;
}

function MapController({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 13);
    }, [center, map]);
    return null;
}

function LocationMarker({ onSelect, position }: { onSelect: (lat: number, lng: number) => void; position: [number, number] }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return position ? <Marker position={position} icon={icon} /> : null;
}

export default function MapPicker({ lat, lng, onLocationSelect }: MapPickerProps) {
    return (
        <div className="h-full w-full relative z-0">
            <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-xl">
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapController center={[lat, lng]} />
                <LocationMarker onSelect={onLocationSelect} position={[lat, lng]} />
            </MapContainer>
        </div>
    );
}