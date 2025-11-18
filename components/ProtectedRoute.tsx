"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authStorage } from "@/lib/localStorage";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLogedIn, setIsLogedIn] = useState(false);

    useEffect(() => {
        const token = authStorage.getToken();

        if (!token) {
            router.replace("/login");
        } else {
            setIsLogedIn(true);
        }
    }, []);

    if (!isLogedIn) {
        return <div></div>;
    }

    return <>{children}</>;
}
