"use client"

import {Link, Tooltip, useDisclosure} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {Menu} from "@/app/components/ui/SVG";

export const MenuMobile = (
    {tableData, id}: { tableData: { id: number, name: string }[], id: string },
) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <Modal
                isOpen={isOpen}
                placement={"top-center"}
                onOpenChange={onOpenChange}
                scrollBehavior={"inside"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">分类</ModalHeader>
                            <ModalBody>
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
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* 模态菜单按钮  */}
            <div className={"md:hidden fixed bottom-24 right-10"}>
                <Tooltip content="menu" color={"foreground"} closeDelay={10} placement="left">
                    <Button
                        onClick={onOpen}
                        variant={"flat"}
                        aria-label={"to bottom"}
                        color={"secondary"}
                        isIconOnly={true}
                    >
                        <Menu/>
                    </Button>
                </Tooltip>
            </div>
        </>
    )
}