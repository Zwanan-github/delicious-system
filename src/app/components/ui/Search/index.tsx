"use client"

import {useRef, useState} from "react";
import toast from "react-hot-toast";
import {formattedDate} from "../../../../../lib/utils";
import {FoodListContent} from "@/app/components/ui/FoodList";
import {Spinner} from "@nextui-org/react";

export const Search = () => {

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const categoryOptions = useRef<Map<number, string>>(new Map())
    const [foods, setFoods] = useState<{
        id: number,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    }[] | null>(null)

    const getCategories = async () => {
        const res = await fetch("/api/category")
        if (res.status === 200) {
            const data = await res.json()
            categoryOptions.current = new Map(data.map((category: {
                id: number,
                name: string
            }) => [category.id, category.name]))
            return;
        }
        toast.error("获取分类失败")
    }

    const searchFood = async () => {
        setLoading(true)
        setFoods([])
        await getCategories()
        const res = await fetch(`/api/food/search`, {
            method: 'POST',
            body: JSON.stringify({
                name: search
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status !== 200) {
            toast.error('搜索失败')
            setLoading(false)
            return
        }
        const data = await res.json()
        setFoods(data.map((food: {
            id: number,
            name: string,
            description: string,
            category: number,
            heat: number,
            taste: string,
            createdAt: string
        }) => {
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
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-2">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">搜索页面</h1>
                <div className="flex flex-wrap space-y-4 md:space-y-0 md:flex-nowrap md:space-x-4">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                        placeholder="请输入搜索内容..."
                    />
                    <button
                        onClick={searchFood}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        搜索
                    </button>
                </div>
            </div>
            <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                {loading ?
                    <div className="flex justify-center items-center">
                        <Spinner label="Loading..."/>
                    </div>
                    :
                    <>
                        {!foods && <p className="text-gray-600 dark:text-gray-300">搜索结果将在这里显示</p>}
                        {foods && foods.length === 0 ?
                            <p className="text-gray-600 dark:text-gray-300">暂无结果</p>
                            :
                            foods && <FoodListContent foods={foods}/>
                        }
                    </>
                }
            </div>
        </div>
    )
}