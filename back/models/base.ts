import z from "zod"
import { app } from "../init"

// 所有模型声明按照：
// 1. zod schema
// 2. TypeScript 类型（计算得出，不手写）
// 3. 获取集合的函数
// 4. 需要定义 dto 的时候，通过 zod schema, hasId 配合计算出来

export const hasId = z.object({
  _id: z.string().describe("文档ID"),
})
export type HasId = z.infer<typeof hasId>

// 特殊处理案例，比如分页结果的 schema，因为只在返回时用，只会用在 procedure.ouput(schema) 中，因此只定义 schema
// eg. paginatedResult(z.intersection(dbVersion,withId))
export function paginatedResult<T extends z.ZodTypeAny>(colSchema: T) {
  return z.object({
    total: z.number().describe("总条数"),
    list: z.array(colSchema),
  })
}

// 数据库版本号记录
export const dbVersion = z.object({
  tag: z.literal("base").describe("只需要一个文档"),
  version: z.number().describe("数据库版本号"),
})

export type DbVersion = z.infer<typeof dbVersion>

export const dbVersionCols = () =>
  app.mongo.db!.collection<DbVersion>("dbVersions")

// pingHis 集合，记录每次 ping 的时间和 IP 地址
export const pingHis = z.object({
  time: z.number().describe("时间戳"),
  ip: z.string().describe("请求IP地址"),
  count: z.number().describe("请求次数"),
})

export type PingHis = z.infer<typeof pingHis>

export const pingHisCols = () => app.mongo.db!.collection<PingHis>("pingHis")
