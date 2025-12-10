"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault(); //cancela o processo de submit do HTML
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            router.refresh(); //Atualiza rotas do servidor
            router.push('/');
        } else {
            const data = await res.json();
            setError(data.error);
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

                <label className="block mb-2 text-sm font-bold">E-mail</label>
                <input type="email" name="email" required className="w-full p-2 mb-4 border rounded" />

                <label className="block mb-2 text-sm font-bold">Senha</label>
                <input type="password" name="password" required className="w-full p-2 mb-6 border rounded" />

                <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded font-bold">
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}