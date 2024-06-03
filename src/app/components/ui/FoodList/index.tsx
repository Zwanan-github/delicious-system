import {Code, Link, Spinner} from "@nextui-org/react";
import {Arrow} from "@/app/components/ui/SVG";

export const FoodList = ({foods}: {
    foods: {
        id: number,
        image: string,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    }[] | null
}) => {
    return (
        <>
            {!foods ?
                <div className="flex justify-center items-center h-screen">
                    <Spinner label="Loading..."/>
                </div>
                :
                <div className={"w-full mx-auto p-2 md:p-8 h-full"}>
                    <FoodListContent foods={foods}/>
                </div>
            }
        </>
    )
}

export const FoodListContent = ({foods} : {
    foods: {
        id: number,
        image: string,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    }[] | null
}) => {
    return (
        <>
            {foods &&
                <>
                    {/* 共多少条结果 */}
                    <div className="text-xl pl-5">共 {foods.length} 条结果</div>
                    {foods
                    .map(food => (
                        <div key={food.id}
                             className="max-w-4xl w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden flex my-4">
                            <div
                                className="md:w-1/3 bg-cover"
                                style={{backgroundImage: `url('${food.image}')`}}
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
                                            <span
                                                className="float-left font-semibold">发布于: {food.createdAt}</span>
                                    <Link href={`/food/${food.id}`} isBlock className="py-0 float-right">
                                        去看看
                                        <Arrow/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            }
        </>
    )
}