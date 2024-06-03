import {formattedDate} from "../../../../../lib/utils";
import {Code, Divider, Spinner} from "@nextui-org/react";

export const FoodCard = ({ food }: {
    food: {
        id: number,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    } | null
}) => {
    return (
        <>
            {food ? (
                <div className="max-w-screen-xl mx-auto pt-4 px-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url('/images/rotating/second.png')` }}></div>
                        <div className="p-6">
                            <h2 className="text-3xl mb-4">{food.name}</h2>
                            <div className="text-gray-700 space-y-2">
                                <Code size={"md"} className="mr-4">
                                    <span className="font-semibold">分类: </span>
                                    <span>{food.category}</span>
                                </Code>
                                <Code size={"md"} className="mr-4">
                                    <span className="font-semibold">热度: </span>
                                    <span>{food.heat}</span>
                                </Code>
                                <Code size={"md"} className="mr-4">
                                    <span className="font-semibold">品尝起来: </span>
                                    <span>{food.taste}</span>
                                </Code>
                                <Code size={"md"} className="mr-4">
                                    <span className="font-semibold">发布于: </span>
                                    <span>{formattedDate(food.createdAt)}</span>
                                </Code>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white mt-6 min-h-96 p-6 dark:bg-gray-900 rounded-lg shadow-lg ">
                        <div>
                            <h2 className="text-3xl mb-4">描述</h2>
                            <Divider/>
                            <div className="whitespace-pre-wrap mt-4 text-xl">
                                {food.description}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Spinner label="Loading..."/>
                </div>
            )}
        </>
    )
}
