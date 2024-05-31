import {NextRequest} from "next/server";
import {Food} from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
import {jsonResponse} from "../../../../../lib/utils";

// 根据传过来的对象，对其各个字段查询
export const POST = async (
    req: NextRequest
) => {
    const body : Food = await req.json()
    // 模糊查询， 如果有id 就查询id， 如果没有id 就查询name
    if (body.id) {
        const res = await prisma.food.findMany({
            where: {
                id: body.id,
            },
        })
        return jsonResponse(200, res)
    } else if (body.name) {
        const res = await prisma.food.findMany({
            where: {
                name: {
                    contains: body.name,
                },
            },
        })
        return jsonResponse(200, res)
    } else if (body.category) {
        const res = await prisma.food.findMany({
            where: {
                category: body.category,
            },
        })
        return jsonResponse(200, res)
    } else {
        const res = await prisma.food.findMany()
        return jsonResponse(200, res)
    }
}