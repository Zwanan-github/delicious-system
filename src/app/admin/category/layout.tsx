import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "分类管理",
    description: "好吃的美食分门别类",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="mt-6 w-full flex flex-col justify-center items-center">{children}</div>
    );
}