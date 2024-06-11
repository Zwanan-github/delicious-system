import { NextResponse } from 'next/server'

/**
 * Returns a Response object with a JSON body
 */
export function jsonResponse(status: number, data: any, init?: ResponseInit) {
    return new NextResponse(JSON.stringify(data), {
        ...init,
        status,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        },
    })
}


/**
 * 去掉后面的时区, 2024-05-31T11:14:25.656+08:00[Asia/Shanghai] -> 2024-05-31T11:14:25.656+08:00
 * @param date
 * @constructor
 */
export function ZonedDateTimeFormat(date: string) {
    return date.replace(/\[.*\]$/, '')
}

/**
 * 格式化日期 2024-05-31T11:14:25.656+08:00 -> 2024-05-31 11:14:25
 * @param date
 */
export const formattedDate = (date: string) => {
    return date.replace('T', ' ').split('.')[0];
}

export const accessFoods = async (id: number) => {
    console.info('accessFoods', id)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        })
    })
}
