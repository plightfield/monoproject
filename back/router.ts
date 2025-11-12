import { t } from "./init"
import { getBaseInfo, getPingHis, ping } from "./rpc/base"

const routes = {
  ping,
  getPingHis,
  getBaseInfo,
}

for (const key of Object.keys(routes)) {
  const route = routes[key as keyof typeof routes]
  if (route.meta?.openapi) {
    const api: { [key: string]: any } = route.meta.openapi
    api.method = route._def.type === "query" ? "GET" : "POST"
    api.path = `/${key}`
  }
}

export const appRouter = t.router(routes)

export type AppRouter = typeof appRouter
