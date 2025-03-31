"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../services/authService";

const AuthWrapper = ({ children }: { children: React.ReactNode}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated();
            if (!auth) {
                router.push('/');
            }
            setLoading(false);
        };
        checkAuth();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {children}
        </>
    );
};

export default AuthWrapper;