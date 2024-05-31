import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {verifyAuth} from "../lib/auth";


export async function middleware(req: NextRequest) {
    // validate the user is authenticated
    const verifiedToken = await verifyAuth(req).catch((err) => {
        console.error(err.message)
    })

    if (!verifiedToken) {
        // if this an API request, respond with JSON
        if (req.nextUrl.pathname.startsWith('/api/')) {
            return new NextResponse(
                JSON.stringify({ 'error': { message: 'authentication required' } }),
                { status: 401 });
        }
        // otherwise, redirect to the set token page
        else {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
}

export const config = {
    matcher: [
        '/api/admin/:path*',
        '/admin/:path*',
        '/api/auth(/(?!login|logout).*)'
    ],
};
