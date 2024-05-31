import {NextRequest} from "next/server";
import {jsonResponse} from "../../../../../lib/utils";

// 判断登录状态
export const GET = async (
    req: NextRequest
) => {
    return jsonResponse(200, {message: '已登录'})
}