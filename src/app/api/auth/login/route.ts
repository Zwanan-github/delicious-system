import {NextRequest} from 'next/server';
import {setUserCookie} from "../../../../../lib/auth";
import {jsonResponse} from "../../../../../lib/utils";


export const POST = async (
    req: NextRequest
) => {
    try {
        // 从请求体中获取 username 和 password
        const {username, password} = await req.json();
        // 简单的用户名和密码校验
        if (username === "admin" && password === "123456") {
            return await setUserCookie(jsonResponse(200, {message: '登录成功'}))
        } else {
            // 用户名或密码不正确
            return jsonResponse(401, {message: 'Invalid username or password'});
        }
    } catch (error) {
        // 处理错误
        return jsonResponse(404, {message: 'Internal Server Error'});
    }
};
