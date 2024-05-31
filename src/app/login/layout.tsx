import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "登录",
    description: "管理员登录",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}