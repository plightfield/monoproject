import { useEffect } from "react"
import rpc from "~/rpc"

export default function Main() {
  useEffect(() => {
    rpc.ping.mutate().then((res) => {
      console.log(res)
    })
  }, [])
  return <div>this is pc</div>
}
