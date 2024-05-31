# 美食系统

> 一个由 `Next.js`, `Prisma`, `MySQL`, `NextUI`, `Tailwind CSS` 开发的美食系统
> [English README](./README.md)

## 安装

```shell
npm i
```

## 启动

* 在根目录创建 `.env` 文件 
  > .env 例子
    ```
    DATABASE_URL="mysql://root:hh031010@123.60.107.63:10086/delicious_system"
    JWT_SECRET_KEY="delicious_system"
    ```
* 启动
    * prisma
      ```shell
      npx prisma generate # generate prisma client
      npm prisma db push  # push schema to database
      npx prisma studio   # open studio
      ```
    * server
      ```shell
      npm run dev
      ```
      > 访问 http://localhost:3000