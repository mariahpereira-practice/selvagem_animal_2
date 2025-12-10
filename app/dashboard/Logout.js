"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await fetch('/api/logout', {
            method: 'POST'
        });
        router.refresh();
        router.push('/login');
    }

    return (
        <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium px-4 py-2 border-red-200 rounded-md border hover:bg-red-50">
            Sair
        </button>
    );
}    