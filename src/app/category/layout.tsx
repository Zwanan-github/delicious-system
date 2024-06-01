import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "分类",
    description: "美食分类",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}