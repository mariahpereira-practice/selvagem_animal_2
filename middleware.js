import { NextResponse } from "next/server";

export function middleware(request) {
    const session = request.cookies.get("session");
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }
    const publicRoutes = [
        "/",          
        "/login", 
        "/about"
    ];

    const isPublicRoute = publicRoutes.includes(pathname);
    if (!session && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (session && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}