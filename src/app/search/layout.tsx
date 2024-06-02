import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "美食搜索",
    description: "美食搜索",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}