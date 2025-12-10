'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import styles from "./header.module.css";

export default function AuthButton({ user }) {
    const router = useRouter();
    const [nomeUsuario, setNomeUsuario] = useState('');


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const perfilRef = doc(db, 'users', currentUser.uid);
                    const perfilSnap = await getDoc(perfilRef);
                    
                    if (perfilSnap.exists()) {
                        const data = perfilSnap.data();
                        setNomeUsuario(data.nome || '');
                    }
                } catch (error) {
                    console.error('Erro ao buscar nome:', error);
                }
            } else {
                setNomeUsuario('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            // 1. Deslogar do Firebase Client SDK (navegador)
            await signOut(auth);

            // 2. Deslogar do backend (remover cookie de sessão)
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (user) {
        return (
            <>
            <Link href="/animal">Ver Animais</Link>
            <div className={styles.authContainer}>
                <span className={styles.userEmail}>
                    Olá, {nomeUsuario || user.email}!
                </span>
                <Link href="/perfil" className={styles.perfilLink}>
                    Perfil
                </Link>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
            </>
        );
    }

    return (
        <>
        <div className={styles.authContainer}>
            <Link href="/login" className={styles.loginButton}>
                Login
            </Link>
        </div>
        </>
    );
}
