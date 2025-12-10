'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./header.module.css";

export default function AuthButton({ user }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
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
                <span className={styles.userEmail}>Olá {user.email}!</span>
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
