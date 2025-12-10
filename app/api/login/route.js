import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

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