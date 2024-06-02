import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "热度榜单",
    description: "美食热榜",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}