import {prisma} from "../../../../lib/prisma";
import {jsonResponse} from "../../../../lib/utils";
import {NextRequest} from "next/server";
import {Food} from "@prisma/client";

export const GET = async () => {
    const res = await prisma.food.findMany({
        orderBy: {
            heat: 'desc'
        }
    })
    return jsonResponse(200, res)
}

// 根据 id 增加热度
export const POST = async (
    req: NextRequest,
) => {
    const body : Food = await req.json()
    if (!body.id) {
        return jsonResponse(500, {message: 'id不能为空'})
    }
    //根据 id  heat 自增
    const res = await prisma.food.update({
        where: {
            id: body.id,
        },
        data: {
            heat: {
                increment: 1
            }
        }
    })
    return jsonResponse(200, res)
}
