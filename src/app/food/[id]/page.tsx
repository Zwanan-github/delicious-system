import {FoodCard} from "@/app/components/ui/FoodCard";
import {formattedDate} from "../../../../lib/utils";

const Page = async ({ params } : {params: { id: string}}) => {

    const { id } = params

    const getFood = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/search`, {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(id),
            }),
        });
        if (res.status !== 200) {
            console.error("获取美食信息失败");
            return null;
        }
        const data: {
            id: number,
            name: string,
            description: string,
            category: string,
            heat: number,
            taste: string,
            createdAt: string
        }[] = await res.json();

        if (!Array.isArray(data) || data.length !== 1) {
            console.error("获取美食信息失败");
            return null;
        }
        // 获取category
        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/search`, {
            method: "POST",
            body: JSON.stringify({
                id: data[0].category,
            }),
        });
        data[0] = {
            ...data[0],
            category: (await categoryRes.json())[0].name,
            createdAt: formattedDate(data[0].createdAt)
        };
        return data[0];
    }

    const food = await getFood()


    return (
        <div className={"max-w-screen-xl mx-auto min-h-screen md:p-6"}>
            <FoodCard food={food}/>
        </div>
    )
}

export default Page;