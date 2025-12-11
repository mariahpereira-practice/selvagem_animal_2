import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

function validateLoginData(email, password) {
    const errors = [];

    if (!email || typeof email !== 'string') {
        errors.push('E-mail é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('E-mail inválido');
    }

    if (!password || typeof password !== 'string') {
        errors.push('Senha é obrigatória');
    } else if (password.length < 6) {
        errors.push('Senha deve ter no mínimo 6 caracteres');
    }

    return errors;
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const validationErrors = validateLoginData(email, password);
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { error: validationErrors.join(', ') },
                { status: 400 }
            );
        }

        const apiKey = process.env.FIREBASE_API_KEY;
        const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;

        const res = await fetch(authUrl, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: data.error.message }, { status: 401 });
        }

        await createSession(data.idToken);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}