import {Arrow, Cola, Recommend, Search} from "@/app/components/ui/SVG";
import {RotatingChart} from "@/app/components/ui/RotatingChart";
import {Toaster} from "react-hot-toast";

export default function Home() {
    return (
        // 水平居中
        <>
            {/* 特色 */}
            <Feature/>
        </>
    );
}

// 特色
const Feature  = () => {

    const title = "美食系统"
    const desc = "品味全球美食，不出家门尽享饕餮盛宴！无论是异国风情还是本地特色，我们的美食系统为您精心挑选，只为每一口的完美体验。让每一次用餐，都成为幸福的享受。快来探索吧，舌尖上的美妙世界在等你！"
    const features = [
        {
            title: "美食分类",
            desc: "我们的美食系统不仅涵盖多种美食分类，还提供详细的菜品介绍和推荐，让您轻松找到心仪的美食，享受多样化的美食体验。快来探索我们的美食世界，开启一段美味之旅吧！",
            icon: <Cola/>,
        },
        {
            title: "美食搜索",
            desc: "美食搜索，轻松发现让你心动的每一道佳肴！无论是中餐、西餐，还是异域风情，快速精准的搜索功能为你呈现最符合你口味的美食选择。快来使用我们的美食系统，享受个性化的推荐和全面的美食导航，开启一段专属于你的美味旅程吧",
            icon: <Search/>,
        },
        {
            title: "美食推荐",
            desc: "美食推荐，让美食成为你的生活指南！我们精选了全球美食，为用户提供最符合你口味的推荐，让你轻松找到心仪的美食，享受美食的乐趣。快来使用我们的美食系统，开启一段美食之旅吧！",
            icon: <Recommend/>,
        }
    ]
    return (
        <>
            <div className="p-8">
                <h1 className="text-4xl font-medium text-gray-700 text-center mt-6">
                    {title}
                </h1>
                <p className="text-center mt-6 text-lg font-light text-gray-500">
                    {desc}
                </p>
            </div>
            {/* 轮播图 */}
            <RotatingChart/>

            <div className="grid grid-cols-1 md:grid-cols-3 md:mx-10">
                {features.map((feature, index) => (
                    <div className="p-8" key={index}>
                        <div
                            className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500 shadow-2xl"
                        >
                            {feature.icon}
                        </div>
                        <h2 className="uppercase mt-6 text-indigo-500 font-medium mb-3">
                            {feature.title}
                        </h2>
                        <p className="font-light text-sm text-gray-500 mb-3 h-28">
                            {feature.desc}
                        </p>
                        <a className="text-indigo-500 flex items-center hover:text-indigo-600" href="/">
                            去看看
                            <Arrow/>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}