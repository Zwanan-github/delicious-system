import React from "react";

export async function generateMetadata({ params }: { params: { slug: string[]} }) {

    const { slug } = params;

    if (Array.isArray(slug) && slug.length === 1) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/search`, {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(slug[0]),
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            if (data.length === 1) {
                return {
                    title: `美食分类 — ${data[0].name}`,
                    description: `美食分类 — ${data[0].name}`,
                };
            }
        }
    }
    return {
        title: "美食分类",
        description: "美食分类",
    };
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}