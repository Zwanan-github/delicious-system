"use client"

import {MyForm} from "@/app/components/ui/Form";

export default function Home() {
    return (
        <>
            <div className="mb-4">
                <p className="w-full text-3xl text-center">美食管理</p>
            </div>
            <div className="w-full max-w-5xl">
                <MyForm type="food"/>
            </div>
        </>
    );
}
