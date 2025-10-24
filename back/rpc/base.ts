import z from "zod"
import { t } from "../init"
import { hasId, paginatedResult, pingHis, pingHisCols } from "../models/base"

export default {
  ping: t.procedure
    .meta({
      openapi: {
        summary: "ping 接口",
        description: "演示数据校验模型的使用和文档系统",
        tags: ["基础"],
      },
    })
    .output(z.literal("pong").describe("演示数据校验模型的使用和文档系统"))
    .mutation(async ({ ctx }) => {
      console.log(ctx)
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
    }),

  pingHis: t.procedure
    .meta({
      openapi: {
        summary: "ping 结果",
        description: "演示数据校验模型的使用和文档系统",
        tags: ["基础"],
      },
    })
    .output(paginatedResult(z.intersection(pingHis, hasId)))
    .query(async () => {
      const list = await pingHisCols().find({}).sort({ time: -1 }).toArray()
      const total = await pingHisCols().countDocuments()
      return {
        total,
        list: list.map((el) => ({ ...el, _id: el._id.toString() })),
      }
    }),
}
