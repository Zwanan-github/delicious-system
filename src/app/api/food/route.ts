import {prisma} from "../../../../lib/prisma";
import {jsonResponse} from "../../../../lib/utils";

export const GET = async () => {
    const res = await prisma.food.findMany()
    return jsonResponse(200, res)
}
