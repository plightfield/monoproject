import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../../back/router"

export function subscribeRpcError(cb: (err: string) => void) {
  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && e.reason.name && e.reason.name === "TRPCClientError") {
      cb(e.reason.message)
    }
  })
}

export default createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.PROD ? "/api/rpc" : "http://localhost:5550/rpc",
    }),
  ],
})
