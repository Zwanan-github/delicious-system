import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import {Logo} from "@/app/components/ui/SVG";
import {Button} from "@nextui-org/button";
import {ThemeSwitcher} from "@/app/components/switcher/ThemeSwitcher";
import {UserState} from "@/app/components/ui/UserState";

export const MyNavbar = () => {
    const menuItems = [
        {name: "首页", path: '/'},
        {name: "分类", path: '/category'},
        {name: "美食搜索", path: '/search'},
        {name: "热度榜单", path: '/heat'}
    ];

    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="md:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="md:hidden" justify="center">
                <NavbarBrand>
                    <Logo />
                    <p className="text-3xl font-bold text-inherit">美食系统</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4" justify="start">
                <NavbarBrand>
                    <Button variant="light">
                        <Logo />
                        <p className="text-3xl">美食系统</p>
                    </Button>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            isBlock
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={item.path}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
                <NavbarItem>
                    <UserState/>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={item.path}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
