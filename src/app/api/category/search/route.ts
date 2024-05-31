import {NextRequest} from "next/server";
import {prisma} from "../../../../../lib/prisma";
import {jsonResponse} from "../../../../../lib/utils";
import {Category} from "@prisma/client";

// 根据传过来的对象，对其各个字段查询
export const POST = async (
    req: NextRequest
) => {
    const body : Category = await req.json()
    // 模糊查询， 如果有id 就查询id， 如果没有id 就查询name
    if (body.id) {
        const res = await prisma.category.findMany({
            where: {
                id: body.id,
            },
        })
        return jsonResponse(200, res)
    } else if (body.name) {
        const res = await prisma.category.findMany({
            where: {
                name: {
                    contains: body.name,
                },
            },
        })
        return jsonResponse(200, res)
    } else {
        const res = await prisma.category.findMany()
        return jsonResponse(200, res)
    }
}