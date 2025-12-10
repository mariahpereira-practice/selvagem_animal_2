import { NextResponse } from "next/server";
import { removeSession } from "@/lib/session.js";

export async function POST() {
    try {
        await removeSession();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}