import { t } from "./init"
import base from "./rpc/base"

const routes = {
  ...base,
}

for (const key of Object.keys(routes)) {
  const route = routes[key as keyof typeof routes]
  if (route.meta?.openapi) {
    ;(route.meta.openapi as any).method =
      route._def.type === "query" ? "GET" : "POST"
    ;(route.meta.openapi as any).path = `/${key}`
  }
}

export const appRouter = t.router(routes)

export type AppRouter = typeof appRouter
