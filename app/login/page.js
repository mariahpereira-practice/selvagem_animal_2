"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "./login.css"; 

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

        try {
            // 1. Fazer login no Firebase Client SDK (navegador)
            await signInWithEmailAndPassword(auth, email, password);

            // 2. Fazer login no backend para criar cookie de sessão
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
        } catch (err) {
            console.error('Erro no login:', err);
            setError(err.message || 'Erro ao fazer login');
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                {error && <p className="login-error">{error}</p>}
                
                <div className="form-group">
                    <label>E-mail</label>
                    <input 
                        type="email" 
                        name="email"
                        className={errors.email ? 'error' : ''}
                        placeholder="seu@email.com"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input 
                        type="password" 
                        name="password"
                        className={errors.password ? 'error' : ''}
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="login-button"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}