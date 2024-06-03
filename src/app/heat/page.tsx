import {formattedDate} from "../../../lib/utils";
import {FoodList, FoodListContent} from "@/app/components/ui/FoodList";

const Page = async () => {

    const getAllCategory = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status !== 200) {
            console.error('获取失败');
            return [];
        }
        return await res.json();
    }

    const getFoods = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status !== 200) {
            console.error("获取食物列表失败")
            return []
        }
        const data = await res.json()
        if (!Array.isArray(data) || data.length === 0) {
            return []
        }
        return data.map((food) => {
            return {
                id: food.id,
                name: food.name,
                description: food.description,
                category: categoryData.find((category: {id: number, name: string}) => category.id === food.category)?.name || "未知",
                heat: food.heat,
                taste: food.taste,
                createdAt: formattedDate(food.createdAt)
            }
        })
    }

    const categoryData = await getAllCategory();
    const foods = await getFoods();

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center px-2">
                <FoodListContent foods={foods}/>
            </div>
        </div>
    )
}

export default Page

