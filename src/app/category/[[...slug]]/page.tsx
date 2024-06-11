import {FoodList} from "@/app/components/ui/FoodList";
import {formattedDate} from "../../../../lib/utils";
import {MenuMobile, MenuPc} from "@/app/components/ui/CategoryList";

const Page = async (
    { params }: { params: { slug: string[]} }
) => {

    const id = (Array.isArray(params.slug)  && params.slug.length === 1)? params.slug[0] : "-1";

    const getAllCategory = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/`,
            { cache: 'no-store' }
        );
        if (res.status !== 200) {
            console.error('获取失败');
            return [];
        }
        return await res.json();
    }

    const getFoods = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/search`, {
            method: "POST",
            body: JSON.stringify({
                category: id === "-1" ? null : parseInt(id)
            }),
            headers: {
                "Content-Type": "application/json"
            },
            cache: 'no-store'
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
                image: food.image,
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
        <div className={"max-w-screen-xl md:grid grid-cols-12 mx-auto min-h-screen pt-4 md:p-6"}>
            <div className={"w-full md:col-span-2 h-full"}>
                {/* 侧边栏 */}
                <MenuPc id={id} tableData={[{id: -1, name: "全部"}, ...categoryData]}/>
                <MenuMobile id={id} tableData={[{id: -1, name: "全部"}, ...categoryData]}/>
            </div>
            <div className={"w-full md:col-span-10 h-full"}>
                {/* 右边内容栏 */}
                <FoodList foods={foods}/>
            </div>
        </div>
    )
}

export default Page;