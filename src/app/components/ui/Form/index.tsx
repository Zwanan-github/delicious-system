"use client"

import {
    DatePicker,
    getKeyValue,
    Input, Select, SelectItem, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Textarea
} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {Button} from "@nextui-org/button";
import {getLocalTimeZone, now} from "@internationalized/date";
import {formattedDate, ZonedDateTimeFormat} from "../../../../../lib/utils";
import toast from "react-hot-toast";


export const FoodForm = () => {

    // 绑定
    const [
        id,
        name,
        description,
        taste,
        [createdAt, setCreatedAt],
        [loading, setLoading],
        [categoryValue, setCategoryValue],
        categoryOptions,
    ] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLTextAreaElement>(null),
        useRef<HTMLInputElement>(null),
        useState(now(getLocalTimeZone())),
        useState(true),
        useState<string>(""),
        useRef<Map<number, string>>(new Map()),
    ]

    const properties = [
        {name: "id"},
        {name: "name"},
        {name: "description"},
        {name: "category"},
        {name: "heat"},
        {name: "taste"},
        {name: "createdAt"},
    ]

    const [tableData, setTableData]
        = useState<{
        id: number,
        name: string,
        description: string,
        category: string,
        heat: number,
        taste: string,
        createdAt: string
    }[]>([])

    const addFood = async () => {
        if (!name.current?.value || !description.current?.value || !categoryValue || !taste.current?.value) {
            toast.error("请填写完整")
            return
        }
        const food = {
            name: name.current?.value,
            description: description.current?.value,
            category: parseInt(categoryValue),
            heat: 0,
            taste: taste.current?.value,
            createdAt: ZonedDateTimeFormat(createdAt.toString()),
        }
        const res = await fetch("/api/admin/food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            await getFood()
            toast.success("添加成功")
        } else {
            toast.error("添加失败")
        }
    }
    const updateFood = async () => {
        if (!id.current?.value || !name.current?.value || !description.current?.value || !categoryValue || !taste.current?.value) {
            toast.error("请填写完整")
            return
        }
        const food = {
            id: parseInt(id.current?.value),
            name: name.current?.value,
            description: description.current?.value,
            category: parseInt(categoryValue),
            taste: taste.current?.value,
            createdAt: ZonedDateTimeFormat(createdAt.toString()),
        }
        const res = await fetch("/api/admin/food", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            await getFood()
            toast.success("更新成功")
        } else {
            toast.error("更新失败")
        }
    }
    const deleteFood = async () => {
        if (!id.current?.value) {
            toast.error("请填写完整")
            return
        }
        const res = await fetch(`/api/admin/food?id=${id.current.value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (res.status === 200) {
            await getFood()
            toast.success("删除成功")
        } else {
            toast.error("删除失败")
        }
    }

    const showData = async (data: {
        id: number,
        name: string,
        description: string,
        category: number,
        heat: number,
        taste: string,
        createdAt: string
    }[]) => {
        setLoading(false)
        setTableData(data.map((food) => {
            return {
                id: food.id,
                name: food.name,
                description: food.description,
                heat: food.heat,
                taste: food.taste,
                category: categoryOptions.current.get(food.category)!,
                createdAt: formattedDate(food.createdAt),
            }
        }))
    }

    const searchFood = async () => {
        setLoading(true)
        setTableData([])
        // 根据多字段搜索
        const food = {
            id: id.current ? parseInt(id.current?.value) : null,
            name: name.current?.value,
            category: parseInt(categoryValue),
        }
        const res = await fetch("/api/food/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            const data = await res.json()
            await showData(data)
            toast.success("搜索成功")
        } else {
            toast.error("搜索失败")
        }
    }

    const getFood = async () => {
        setLoading(true)
        setTableData([])
        const res = await fetch("/api/food")
        const data = await res.json()
        if (res.status === 200) {
            await showData(data)
            toast.success("获取成功")
        } else {
            toast.error("获取失败")
        }
    }

    const getCategories = async () => {
        const res = await fetch("/api/category")
        if (res.status === 200) {
            const data = await res.json()
            categoryOptions.current = new Map(data.map((category: { id: number, name: string }) => [category.id, category.name]))
            return;
        }
        toast.error("获取分类失败")
    }

    // 网站就绪
    useEffect(() => {
        getCategories()
        getFood()
    }, [])

    return (
        <>
            {/* 显示数据的表单 */}
            <Table className={"min-h-50"} aria-label="Example table with dynamic content">
                <TableHeader columns={properties}>
                    {(column) => <TableColumn key={column.name}>{column.name}</TableColumn>}
                </TableHeader>
                <TableBody items={tableData} isLoading={loading} loadingContent={<Spinner label="Loading..."/>} emptyContent={"没有找到更多的数据"}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* 生成输入框 */}
            <Input className={"mt-2"} ref={id} size={'sm'} type={"number"} label={"id"}/>
            <Input className={"mt-2"} ref={name} size={'sm'} type={"text"} label={"name"}/>
            <Textarea className={"mt-2"} ref={description} size={'sm'} type={"text"} label={"description"}/>
            <Select
                label="Select an Category"
                className={"mt-2"}
                selectedKeys={[categoryValue]}
                onChange={(e) => setCategoryValue(e.target.value)}
            >
                {
                    // 遍历 map
                    Array.from(categoryOptions.current.entries()).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))
                }
            </Select>
            <Input className={"mt-2"} ref={taste} size={'sm'} type={"text"} label={"taste"}/>
            <DatePicker className={"mt-2"} onChange={(date) => setCreatedAt(date)}
                        hideTimeZone showMonthAndYearPickers
                        defaultValue={now(getLocalTimeZone())} label={"createdAt"}/>

            <div className={"mt-3"}>
                <Button onClick={addFood} className={"w-[25%] px-4 py-2"}>增加</Button>
                <Button onClick={updateFood} className={"w-[25%] px-4 py-2"}>修改</Button>
                <Button onClick={deleteFood} className={"w-[25%] px-4 py-2"}>删除</Button>
                <Button onClick={searchFood} className={"w-[25%] px-4 py-2"}>查询</Button>
            </div>
        </>
    );
}

export const CategoryForm = () => {

    // 绑定
    const [
        id,
        name,
        [loading, setLoading]
    ] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useState(true),
    ]

    const properties = [
        {name: "id"},
        {name: "name"},
    ]

    const [tableData, setTableData]
        = useState<{ id: number, name: string}[]>([])

    const addCategory = async () => {
        if (!name.current?.value) {
            toast.error("请填写完整")
            return
        }
        const food = {
            name: name.current?.value,
        }
        const res = await fetch("/api/admin/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            await getCategory()
            toast.success("添加成功")
        } else {
            toast.error("添加失败")
        }
    }
    const updateCategory = async () => {
        if (!id.current?.value || !name.current?.value) {
            toast.error("请填写完整")
            return
        }
        const food = {
            id: parseInt(id.current?.value),
            name: name.current?.value,
        }
        const res = await fetch("/api/admin/category", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            await getCategory()
            toast.success("更新成功")
        } else {
            toast.error("更新失败")
        }
    }
    const deleteCategory = async () => {
        if (!id.current?.value) {
            toast.error("请填写完整")
            return
        }
        const res = await fetch(`/api/admin/category?id=${id.current.value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (res.status === 200) {
            await getCategory()
            toast.success("删除成功")
        } else {
            toast.error("删除失败")
        }
    }
    const searchCategory = async () => {
        setLoading(true)
        // 根据多字段搜索
        const food = {
            id: id.current ? parseInt(id.current?.value) : null,
            name: name.current?.value,
        }
        const res = await fetch("/api/category/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(food)
        })
        if (res.status === 200) {
            const data = await res.json()
            setTableData(data)
            setLoading(false)
            toast.success("搜索成功")
        } else {
            toast.error("搜索失败")
        }
    }

    const getCategory = async () => {
        setLoading(true)
        setTableData([])
        const res = await fetch("/api/category")
        if (res.status === 200) {
            const data = await res.json()
            setLoading(false)
            setTableData(data)
            toast.success("获取成功")
        } else {
            toast.error("获取失败")
        }
    }

    useEffect(() => {
        getCategory()
    }, []);

    return (
        <>
            {/* 显示数据的表单 */}
            <Table className={"min-h-50"} aria-label="Example table with dynamic content">
                <TableHeader columns={properties}>
                    {(column) => <TableColumn key={column.name}>{column.name}</TableColumn>}
                </TableHeader>
                <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..."/>} items={tableData} emptyContent={"没有找到更多的数据"}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* 生成输入框 */}
            <Input className={"mt-2"} ref={id} size={'sm'} type={"number"} label={"id"}/>
            <Input className={"mt-2"} ref={name} size={'sm'} type={"text"} label={"name"}/>

            <div className={"mt-3"}>
                <Button onClick={addCategory} className={"w-[25%] px-4 py-2"}>增加</Button>
                <Button onClick={updateCategory} className={"w-[25%] px-4 py-2"}>修改</Button>
                <Button onClick={deleteCategory} className={"w-[25%] px-4 py-2"}>删除</Button>
                <Button onClick={searchCategory} className={"w-[25%] px-4 py-2"}>查询</Button>
            </div>
        </>
    );
}