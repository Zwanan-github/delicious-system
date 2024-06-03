import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {verifyAuth} from "../lib/auth";


export async function middleware(req: NextRequest) {
    // 访问 /food/id的时候，修改food为id的heat
    if (req.nextUrl.pathname.startsWith('/food/')) {
        const id = req.nextUrl.pathname.split('/')[2]
        if (id) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(id),
                })
            })
        }
        console.info(`foodId为${id}的食物被访问`)
    }



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
        '/api/auth(/(?!login|logout).*)',
        '/food/:path*'
    ],
};
