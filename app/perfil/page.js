"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./perfil.css";

export default function PerfilPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    
    const [perfil, setPerfil] = useState({
        nome: '',
        cidade: '',
        email: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setPerfil(prev => ({ ...prev, email: currentUser.email }));
                
                await carregarPerfil(currentUser.uid);
            } else {
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const carregarPerfil = async (userId) => {
        try {
            const perfilRef = doc(db, 'users', userId);
            
            const perfilSnap = await getDoc(perfilRef);
            
            if (perfilSnap.exists()) {
                const data = perfilSnap.data();
                setPerfil(prev => ({
                    ...prev,
                    nome: data.nome || '',
                    cidade: data.cidade || ''
                }));
            } else {
                console.log('Perfil ainda não existe, será criado ao salvar');
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            setMessage('Erro ao carregar perfil');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        if (!perfil.nome.trim()) {
            setMessage('Nome é obrigatório');
            setSaving(false);
            return;
        }

        if (!perfil.cidade.trim()) {
            setMessage('Cidade é obrigatória');
            setSaving(false);
            return;
        }

        try {
            await setDoc(doc(db, 'users', user.uid), {
                nome: perfil.nome.trim(),
                cidade: perfil.cidade.trim(),
                email: perfil.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setMessage('Perfil salvo com sucesso! ✅');

            router.push('/');
            router.refresh();
            
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            setMessage('Erro ao salvar perfil ❌');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div className="perfil-loading">Carregando...</div>;
    }

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <h1>Meu Perfil</h1>
                <p className="perfil-subtitle">Gerencie suas informações pessoais</p>

                {message && (
                    <div className={`perfil-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="perfil-form">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={perfil.email}
                            disabled
                            className="input-disabled"
                        />
                        <span className="form-hint">E-mail não pode ser alterado</span>
                    </div>

                    <div className="form-group">
                        <label>Nome Completo *</label>
                        <input
                            type="text"
                            name="nome"
                            value={perfil.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome completo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cidade *</label>
                        <input
                            type="text"
                            name="cidade"
                            value={perfil.cidade}
                            onChange={handleChange}
                            placeholder="Digite sua cidade"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={saving}
                        className="perfil-button"
                    >
                        {saving ? 'Salvando...' : 'Salvar Perfil'}
                    </button>
                </form>
            </div>
        </div>
    );
}