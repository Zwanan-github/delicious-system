import {SliderMenu} from "@/app/components/ui/SliderMenu";
import {FoodList} from "@/app/components/ui/FoodList";

export default function Home({ params }: { params: { slug: string[]} }) {

    const id = (Array.isArray(params.slug)  && params.slug.length === 1)? params.slug[0] : "-1";

    return (
        <div className={"max-w-screen-xl md:grid grid-cols-12 mx-auto min-h-screen md:p-6"}>
            <div className={"w-full md:col-span-2 h-full"}>
                {/* 侧边栏 */}
                <SliderMenu id={id}/>
            </div>
            <div className={"w-full md:col-span-10 h-full"}>
                {/* 右边内容栏 */}
                <FoodList id={id}/>
            </div>
        </div>
    )
}
