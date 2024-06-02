"use client"

import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {formattedDate, ZonedDateTimeFormat} from "../../../../../lib/utils";
import {Code, Link, Spinner} from "@nextui-org/react";
import {Arrow} from "@/app/components/ui/SVG";

export const FoodList = ({id}: { id: string }) => {

    const [loading, setLoading] = useState(true)
    const categoryOptions = useRef<Map<number, string>>(new Map())

    const [foods, setFoods] = useState<{
        id: number,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    }[]>([])

    const showData = async (data: {
        id: number,
        name: string,
        description: string,
        category: number,
        heat: number,
        taste: string,
        createdAt: string
    }[]) => {
        setLoading(false)
        setFoods(data.map((food) => {
            return {
                id: food.id,
                name: food.name,
                description: food.description,
                heat: food.heat,
                taste: food.taste,
                // 从当前页面的 title 中获取 category 的 那么， title 为 美食分类 - name
                category: categoryOptions.current.get(food.category)!,
                createdAt: formattedDate(food.createdAt),
            }
        }))
    }

    const getCategories = async () => {
        const res = await fetch("/api/category")
        if (res.status === 200) {
            const data = await res.json()
            categoryOptions.current = new Map(data.map((category: { id: number, name: string }) => [category.id, category.name]))
            return;
        }
        toast.error("获取分类失败")
    }

    const getFoods = async () => {
        setLoading(true)
        const res = await fetch(`/api/food/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            } ,
            body: JSON.stringify({
                category: id === "-1" ? null : parseInt(id)
            })
        })
        if (res.status !== 200) {
            toast.error("获取食物列表失败")
            return
        }
        const data = await res.json()
        await showData(data)
    }


    useEffect(() => {
        getCategories().then(() => getFoods())
    }, []);

    return (
        <div className={"w-full p-2 md:p-8 h-full flex flex-col"}>
            {
                loading && <Spinner label="Loading..."/>
            }
            <div>
                {foods
                    .map(food => (
                        <div key={food.id} className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex mb-4">
                            <div
                                className="md:w-1/3 bg-cover"
                                style={{backgroundImage: `url('/images/rotating/second.png')`}}
                            ></div>
                            <div className="w-full md:w-2/3 p-4">
                                <h2 className="text-2xl font-bold mb-2">{food.name}</h2>
                                <div className="flex mb-4">
                                    <Code size={"md"} className="mr-4">
                                        <span className="font-semibold">热度: </span>
                                        <span>{food.heat}</span>
                                    </Code>
                                    <Code size={"md"} className="mr-4">
                                        <span className="font-semibold">类型: </span>
                                        <span>{food.category}</span>
                                    </Code>
                                </div>
                                <div className="w-full mb-4">
                                    <Code size={"md"}>
                                        <span className="font-semibold">品尝起来: </span>
                                        <span>{food.taste}</span>
                                    </Code>
                                </div>
                                <div className="w-full ">
                                    <span className="float-left font-semibold">发布于: {ZonedDateTimeFormat(food.createdAt)}</span>
                                    <Link href={`/food/${food.id}`} isBlock className="py-0 float-right">
                                        去看看
                                        <Arrow/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}