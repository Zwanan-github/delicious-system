import {NextRequest} from "next/server";
import {Food} from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
import {jsonResponse} from "../../../../../lib/utils";
import {writeFile} from "node:fs";

export const POST = async (req: NextRequest) => {
    const data = await req.formData()
    const file: File | null = data.get('image') as unknown as File
    const name = data.get('name') as string
    const description = data.get('description') as string
    const category = data.get('category') as string
    const heat = data.get('heat') as string
    const taste = data.get('taste') as string
    if (!name || !description || !category || !heat || !taste) {
        return jsonResponse(400, {
            message: "参数不能为空"
        })
    }
    if (!file) {
        return jsonResponse(400, {
            message: "No file uploaded"
        })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 这里是你要进行保存的文件目录地址
    const path = `./public/images/upload/${file.name}`
    writeFile(path, buffer, (err) => {
        if (err) {
            console.error(err)
            return jsonResponse(500, {
                message: "保存文件失败"
            })
        }
    })
    const res = await prisma.food.create({
        data: {
            name,
            description,
            category: parseInt(category),
            heat: parseInt(heat),
            taste,
            image: `/images/upload/${file.name}`
        }
    })
    if (!res) {
        return jsonResponse(500, {
            message: "保存数据失败"
        })
    }
    return jsonResponse(200, {
        message: "保存成功"
    })
};


export const PUT = async (
    req: NextRequest,
) => {
    const data = await req.formData()
    const id = data.get('id') as string
    const file: File | null = data.get('image') as unknown as File
    const name = data.get('name') as string
    const description = data.get('description') as string
    const category = data.get('category') as string
    const taste = data.get('taste') as string
    console.info(id, name, description, category, taste)
    if (!id || !name || !description || !category || !taste) {
        return jsonResponse(400, {
            message: "参数不能为空"
        })
    }
    if (!file) {
        return jsonResponse(400, {
            message: "No file uploaded"
        })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 这里是你要进行保存的文件目录地址
    const path = `./public/images/upload/${file.name}`
    writeFile(path, buffer, (err) => {
        if (err) {
            console.error(err)
            return jsonResponse(500, {
                message: "保存文件失败"
            })
        }
    })

    console.info("file uploaded", file.name)

    const res = await prisma.food.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            description,
            category: parseInt(category),
            taste,
            image: `/images/upload/${file.name}`
        }
    })
    if (!res) {
        return jsonResponse(500, {
            message: "保存数据失败"
        })
    }
    return jsonResponse(200, {
        message: "保存成功"
    })
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