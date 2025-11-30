"use client";

import { useEffect, useRef } from "react";
import { useHostStore } from "@/store/useHostStore";

export default function HostInitializer({ host }: { host: any }) {
    // We use a ref to ensure this doesn't trigger unnecessary re-renders
    // though useEffect handles dependency tracking well.
    const initialized = useRef(false);

    // Grab the setter from the store
    const setHost = useHostStore((state) => state.setHost);

    // FIX: Move the state update inside useEffect
    useEffect(() => {
        if (!initialized.current) {
            setHost(host);
            initialized.current = true;
        }
    }, [host, setHost]);

    return null;
}