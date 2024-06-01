import {prisma} from "../../../../lib/prisma";
import {jsonResponse} from "../../../../lib/utils";

export const GET = async () => {
    const res = await prisma.category.findMany()
    return jsonResponse(200, res)
}

