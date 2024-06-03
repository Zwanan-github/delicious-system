import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "热度榜单",
    description: "美食热榜",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="max-w-screen-xl mx-auto min-h-screen pt-4 md:p-6">{children}</div>
    );
}