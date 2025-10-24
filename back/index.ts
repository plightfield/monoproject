import {
  type CreateFastifyContextOptions,
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify"

import { app } from "./init"
import { type AppRouter, appRouter } from "./router"
import whiteList from "./whiteList.json"
import { generateOpenApiDocument } from "trpc-to-openapi"
import scalarApi from "@scalar/fastify-api-reference"
import migrate from "./migrate"
import runProcedures from "./procedures"

type RPCOptions = FastifyTRPCPluginOptions<AppRouter>["trpcOptions"]

app.register(fastifyTRPCPlugin, {
  prefix: "/rpc",
  trpcOptions: {
    router: appRouter,
    createContext({ req, res }: CreateFastifyContextOptions) {
      if (req.method === "GET" && process.env.NODE_ENV === "production") {
        // 施加统一请求缓存
        // get 请求缓存 5 分钟
        // 注意根据情况处理，此方案会用到全栈加速，某些路由需要特殊处理
        res.header("cache-control", "public, max-age=300")
      }
      const ip = req.ip
      const path = req.url.replace("/rpc", "")
      if (whiteList.some((el) => path.startsWith(el))) {
        return { req, res, ip }
      }
      // TODO 等待完成 jwt 校验
      return {
        req,
        res,
        //user,
        ip,
      }
    },
    onError({ path, error }) {
      console.info(`[Error - '${path}']:`, error)
    },
  } as RPCOptions,
})
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  description: "此项目为 trpc 项目，文档进行阐述或外部调用时使用",
  version: "1.0.0",
  baseUrl: "http://localhost:5550/rpc",
})
app.register(scalarApi, {
  routePrefix: "/doc",
  configuration: {
    content: openApiDocument,
  },
})

async function main() {
  const addr = await app.listen({ port: 5550, host: "0.0.0.0" })
  console.log(`服务器运行在内网： ${addr}`)
  const v = await migrate()
  console.info("数据库迁移完成，当前版本：v." + v)
  await runProcedures()
  console.info("定时任务启动完成")
}
main()
