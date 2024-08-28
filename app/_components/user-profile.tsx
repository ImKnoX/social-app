'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserProfile() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin')
        },
    });

    if(status == 'loading') {
        return <div>Loading...</div>
    }
    
    if(status == 'authenticated') {
        return (
            <>
            </>
        )
    }
};