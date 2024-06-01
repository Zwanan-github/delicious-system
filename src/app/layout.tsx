import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/provider";
import {MyNavbar} from "@/app/components/ui/Navbar";
import {MyFooter} from "@/app/components/ui/Footer";
import {Toaster} from "react-hot-toast";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "美食系统",
    description: "美食系统，超多美食",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
        <Providers>
            <MyNavbar/>
            {/* 全局Toaster */}
            <Toaster />
            {children}
            <MyFooter/>
        </Providers>
        </body>
        </html>
    );
}