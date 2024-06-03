import {Link} from "@nextui-org/react";


export const MenuPc = (
    {tableData, id}: { tableData: { id: number, name: string }[], id: string },
) => {
    return (
        <div className={"hidden md:flex fixed"}>
            <div className={"flex gap-1 flex-col w-[100%] h-[100%] p-8 rounded-xl"}>
                {tableData
                    .map((item) => {
                        // 竖着排的按钮
                        return (
                            <Link size={"lg"} isBlock
                                  key={item.id}
                                  href={`/category/${(item.id === -1) ? "" : item.id}`}
                                  color={(item.id === -1) ? "secondary" : (item.id === parseInt(id) ? "primary" : "foreground")}
                            >
                                <span
                                    className={"w-[100%] h-[100%] flex justify-center items-center"}>{item.name}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
