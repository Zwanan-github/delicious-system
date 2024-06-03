import {FoodCard} from "@/app/components/ui/FoodCard";
import {formattedDate} from "../../../../lib/utils";

const Page = async ({params}: { params: { id: string } }) => {

    const {id} = params

    const getFood = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/search`, {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(id),
            }),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        if (res.status !== 200) {
            console.error("获取美食信息失败");
            return null;
        }

        const data: {
            id: number,
            image: string,
            name: string,
            description: string,
            category: string,
            heat: number,
            taste: string,
            createdAt: string
        }[] = await res.json();

        if (!Array.isArray(data)) {
            console.error("获取美食信息失败");
            return null;
        }
        // 获取category
        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/search`, {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(data[0].category),
            }),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        if (categoryRes.status !== 200) {
            console.error("获取美食信息失败");
            return null;
        }
        const categoryData: {
            id: number,
            name: string,
        }[] = await categoryRes.json();
        return {
            id: data[0].id,
            image: data[0].image,
            name: data[0].name,
            description: data[0].description,
            category: categoryData[0].name,
            heat: data[0].heat,
            taste: data[0].taste,
            createdAt: formattedDate(data[0].createdAt),
        };
    }

    const food = await getFood()


    return (
        <div className={"max-w-screen-xl mx-auto min-h-screen md:p-6"}>
            <FoodCard food={food}/>
        </div>
    )
}

export default Page;