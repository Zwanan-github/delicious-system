// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@nextui-org/shared-icons";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // 确保组件已挂载
    useEffect(() => {
        setMounted(true);
    }, []);

    // 在组件挂载后，获取本地存储的theme值并设置theme
    useEffect(() => {
        if (mounted) {
            const savedTheme = localStorage.getItem("theme") ?? "light";
            setTheme(savedTheme);
        }
    }, [mounted, setTheme]);

    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    if (!mounted) return null;

    return (
        <Switch
            isSelected={theme === "light"}
            size="lg"
            color="primary"
            onClick={switchTheme}
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
        />
    );
}
