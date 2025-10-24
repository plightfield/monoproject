import rpc from "@/shared/rpc"
import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"

export default function Main() {
  useEffect(() => {
    rpc.ping.mutate().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <div>
      必要可以套一层 layout
      <RouterProvider router={router} />
    </div>
  )
}
