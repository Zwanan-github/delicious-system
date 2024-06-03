import { CategoryForm } from "@/app/components/ui/Form";

const Page = async  () => {
    return (
        <>
            <div className="mb-4">
                <p className="w-full text-3xl text-center">美食管理</p>
            </div>
            <div className="w-full max-w-5xl">
                <CategoryForm/>
            </div>
        </>
    );
}

export default Page;
