"use client"

import {Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@nextui-org/react";
import React, {useEffect} from "react";
import toast from "react-hot-toast";

export const UserState = () => {

    const [isLogin, setIsLogin] = React.useState(false)

    // 判断是否登录
    const check = async () => {
        const res = await fetch('/api/auth/check')
        if (res.status === 200) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }

    const logout = async () => {
        const res = await fetch('/api/auth/logout')
        if (res.status === 200) {
            toast.success('退出成功')
            setIsLogin(false)
        } else {
            toast.error('退出失败')
            setIsLogin(false)
        }
    }

    useEffect(() => {
        check()
    }, []);

    return (
        <>
            {isLogin ?
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            disableAnimation={true}
                            src="https://ui-avatars.com/api/?name=管理员&background=random"
                        />
                    </DropdownTrigger>
                    <DropdownMenu variant="flat">
                        <DropdownItem isReadOnly textValue={"admin"} key="admin">
                            你好，管理员
                            <Divider className="my-4" />
                        </DropdownItem>
                        <DropdownItem color={"primary"} href={"/admin/food"} key="food" textValue={"菜品管理"} >菜品管理</DropdownItem>
                        <DropdownItem color={"primary"} href={"/admin/category"} textValue={"分类管理"} key="category">分类管理</DropdownItem>
                        <DropdownItem color={"danger"} onClick={logout} textValue={"退出"} key="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                :
                <Link isBlock href={'/login'}>登录</Link>
            }
        </>
    )
}