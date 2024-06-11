import React from "react";
import {notFound} from "next/navigation";

export async function generateMetadata({ params } : {params: { id: string}}) {
    const { id } = params;

    if (!parseInt(id)) {
        notFound()
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/search`, {
        method: "POST",
        body: JSON.stringify({
            id: parseInt(id),
        }),
    });

    if (res.status !== 200) {
        console.error("Failed to fetch data")
        notFound()
    }
    const data: [] | unknown = await res.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
        notFound()
    }
    const metadata = {
        title: `${data[0].name}`,
        description: `${data[0].description}`,
    };
    return {
        title: metadata.title,
        description: metadata.description,
    };
}
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}