import {Tooltip} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import React from "react";
import {Top} from "@/app/components/ui/SVG";

export const ToTopBtn = () => {
    return (
        <div className={"fixed bottom-10 right-10"}>
            <Tooltip content="top" color={"foreground"} closeDelay={10} placement="left">
                <Button
                    onClick={() => window.scrollTo({behavior: "smooth", top: 0})}
                    variant={"flat"}
                    aria-label={"to bottom"}
                    color={"success"}
                    isIconOnly={true}
                >
                    <Top/>
                </Button>
            </Tooltip>
        </div>
    )
}