// store/useHostStore.ts
import { create } from 'zustand';

interface HostData {
    _id: string;
    fullName: string;
    location?: string;
    phone?: string;
    email: string;
    description?: string;
    avatarUrl?: string;
    createdAt: string;
}

interface HostStore {
    currentHost: HostData | null;
    isLoading: boolean;
    setHost: (host: HostData) => void;
    clearHost: () => void;
}

export const useHostStore = create<HostStore>((set) => ({
    currentHost: null,
    isLoading: true,
    setHost: (host) => set({ currentHost: host, isLoading: false }),
    clearHost: () => set({ currentHost: null, isLoading: false }),
}));