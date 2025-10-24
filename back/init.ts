import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import "dayjs/locale/zh-cn"
import dayjs from "dayjs"
import { initTRPC } from "@trpc/server"
import { OpenApiMeta } from "trpc-to-openapi"
import redis from "@fastify/redis"
import mongo from "@fastify/mongodb"
dayjs.locale("zh-cn")

const _app = Fastify({
  logger: false,
  routerOptions: {
    maxParamLength: 5000,
  },
})

if (process.env.NODE_ENV === "development") {
  _app.register(cors, {
    origin: "*",
  })
}
_app.register(jwt, { secret: "自定义秘钥" })
_app.register(redis, {
  url: process.env.REDIS_URI,
})
_app.register(mongo, {
  url: process.env.MONGO_URI,
  database: process.env.MONGO_NAME,
  forceClose: true,
})

export const app = _app

export const t = initTRPC.meta<Omit<OpenApiMeta, "method" | "path">>().create()
