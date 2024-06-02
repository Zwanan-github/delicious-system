// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";
import {ToTopBtn} from "@/app/components/ui/ToTopBtn";
import {Toaster} from "react-hot-toast";


export function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
                {/* 全局Toaster */}
                <Toaster />
                {children}
                <ToTopBtn/>
            </NextThemesProvider>
        </NextUIProvider>
    )
}