import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../../back/router"

export default createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.PROD ? "/api/rpc" : "http://localhost:5550/rpc",
    }),
  ],
})
