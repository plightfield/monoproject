import z from "zod"
import { t } from "../init"
import {
  hasId,
  paginatedResult,
  pingHis as pingHisSchema,
  pingHisCols,
  dbVersionCols,
} from "../models/base"

export const ping = t.procedure
  .meta({
    openapi: {
      summary: "ping 接口",
      description: "演示数据校验模型的使用和文档系统",
      tags: ["基础"],
    },
  })
  .output(z.literal("pong").describe("演示数据校验模型的使用和文档系统"))
  .mutation(async ({ ctx }) => {
    await pingHisCols().updateOne(
      {
        ip: (ctx as any).ip,
      },
      {
        $inc: {
          count: 1,
        },
        $set: {
          time: Date.now(),
        },
      },
      { upsert: true }
    )
    return "pong" as const
  })

export const getPingHis = t.procedure
  .meta({
    openapi: {
      summary: "ping 结果",
      description: "演示数据校验模型的使用和文档系统",
      tags: ["基础"],
    },
  })
  .output(paginatedResult(z.intersection(pingHisSchema, hasId)))
  .query(async () => {
    const list = await pingHisCols().find({}).sort({ time: -1 }).toArray()
    const total = await pingHisCols().countDocuments()
    return {
      total,
      list: list.map((el) => ({ ...el, _id: el._id.toString() })),
    }
  })

export const getBaseInfo = t.procedure
  .meta({
    openapi: {
      summary: "基础信息",
      description: "获取服务器基础信息，如数据库版本等",
      tags: ["基础"],
    },
  })
  .output(
    z.object({
      version: z.number(),
      ip: z.string(),
    })
  )
  .query(async ({ ctx }) => {
    // 这里是在 index.ts 中中间件配置过的上下文
    const ip = (ctx as { ip: string }).ip
    const v = await dbVersionCols().findOne({
      tag: "base",
    })
    return {
      version: v?.version || 0,
      ip,
    }
  })
