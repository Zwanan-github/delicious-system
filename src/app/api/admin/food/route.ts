import {NextRequest} from "next/server";
import {Food} from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
import {jsonResponse} from "../../../../../lib/utils";

export const config = {
    runtime: 'edge',
}

export const POST = async (
    req: NextRequest
) => {
    const body: Food = await req.json()
    const res = await prisma.food.create({
        data: body
    })
    if (!res) {
        return jsonResponse(500, {message: '创建失败'})
    }
    return jsonResponse(200, {message: '创建成功'})
}

export const PUT = async (
    req: NextRequest,
) => {
    const body: Food = await req.json()
    const res = await prisma.food.update({
        where: {
            id: body.id
        },
        data: body
    })
    if (!res) {
        return jsonResponse(500, {message: '更新失败'})
    }
    return jsonResponse(200, {message: '更新成功'})
}

export const DELETE = async (
    req: NextRequest
) => {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) {
        return jsonResponse(500, {message: 'id不能为空'})
    }
    const res = await prisma.food.delete({
        where: {
            id: parseInt(id)
        }
    })
    if (!res) {
        return jsonResponse(500, {message: '删除失败'})
    }
    return jsonResponse(200, {message: '删除成功'})
}