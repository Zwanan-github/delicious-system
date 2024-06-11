"use client"

import {Password, Username} from "@/app/components/ui/SVG";
import {useRef} from "react";
import toast from "react-hot-toast";

const Page = async () => {

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const login = async () => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.current?.value,
                password: password.current?.value
            })
        })
        if (res.status === 200) {
            const data = await res.json();
            // 提示 并 等待 1s
            toast.success(data.message)
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = document.referrer;
        } else if (res.status === 401) {
            toast.error('用户名或密码错误')
        } else {
            toast.error('未知错误')
        }
    }

    return (
        <>
            <div className="flex items-center">
                <div className="p-8 lg:w-1/3 h-full mx-auto my-auto">
                    <div className="dark:bg-gray-950 bg-white rounded-t-lg p-8"><p
                        className="text-center text-3xl font-light">登录</p>
                    </div>
                    <div className="dark:bg-gray-900 bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <div className="mt-6">
                            <div className="relative">
                                <input ref={username}
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username" type="text" placeholder="Username"/>
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <Username/>
                                </div>
                            </div>
                            <div className="relative mt-3">
                                <input ref={password}
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="password" type="password" placeholder="Password"/>
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <Password/>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-8">
                                <button onClick={login}
                                    className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page