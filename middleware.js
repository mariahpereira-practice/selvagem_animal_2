import { NextResponse } from "next/server";

export function middleware(request) {
    const session = request.cookies.get("session");

    //Protege todas as rotas que começam com /dashboard
    if(!session && request.nextUrl.pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/login", request.url));
    }

    //Impede que usuários logados acessem a página de login
    if(session && request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["//:path*", "/login"],
}