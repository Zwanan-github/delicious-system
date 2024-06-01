import React from "react";

export async function generateMetadata({ params } : {params: { id: string}}) {
    const { id } = params;

    const res = await fetch(`http://localhost:3000/api/food/search`, {
        method: "POST",
        body: JSON.stringify({
            id: parseInt(id),
        }),
    });

    if (res.status !== 200) {
        console.error("Failed to fetch data")
        return {
            title: "Not Found",
            description: "Not Found",
        };
    }
    const data: [] | unknown = await res.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
        return {
            title: "Not Found",
            description: "Not Found",
        };
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