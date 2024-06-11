import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {verifyAuth} from "../lib/auth";
import {notFound} from "next/navigation";
import toast from "react-hot-toast";
import {accessFoods} from "../lib/utils";


export async function middleware(req: NextRequest) {
    // 访问 /food/id的时候，修改food为id的heat
    if (req.nextUrl.pathname.startsWith('/food/')) {
        const id = req.nextUrl.pathname.split('/')[2]
        // 需要判断数字字符串
        if (id) {
            await accessFoods(parseInt(id))
        }
        return NextResponse.next()
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
    ]
};
