# delicious-system

> A delicious system made with `Next.js`, `Prisma`, `MySQL`, `NextUI`, and `Tailwind CSS`.
> [中文文档](./README_zh.md)

## installation

```shell
npm i
```

## run

* create `.env` file in root directory
  > .env example
    ```
    DATABASE_URL="mysql://root:hh031010@123.60.107.63:10086/delicious_system"
    JWT_SECRET_KEY="delicious_system"
    ```
* run
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
    > open http://localhost:3000
    > 