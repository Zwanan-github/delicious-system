import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "美食管理",
    description: "管理好吃的美食",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="mt-6 w-full flex flex-col justify-center items-center">{children}</div>
    );
}