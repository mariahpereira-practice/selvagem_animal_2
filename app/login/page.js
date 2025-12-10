"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = (email, password) => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (password.length < 6) {
            newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
        }

        return newErrors;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const validationErrors = validateForm(email, password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            router.push('/');
            router.refresh();
        } else {
            const data = await res.json();
            setError(data.error || 'Erro ao fazer login');
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold">E-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button 
                    disabled={loading} 
                    className={`w-full text-white p-2 rounded font-bold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}