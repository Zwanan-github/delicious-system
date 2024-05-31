import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "搜索",
    description: "美食搜索",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}