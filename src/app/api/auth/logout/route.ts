import {jsonResponse} from "../../../../../lib/utils";
import {expireUserCookie} from "../../../../../lib/auth";

// 退出登录
export const GET = async () => {
    return expireUserCookie(jsonResponse(200, {message: '退出成功'}))
}