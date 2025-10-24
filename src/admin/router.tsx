import { HomeOutlined } from "@ant-design/icons"
import type { ReactNode } from "react"
import { createBrowserRouter, type RouteObject } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

// 演示路由使用
export const routes: (RouteObject & { icon: ReactNode; label: string })[] = [
  {
    path: "/",
    element: <Dashboard />,
    icon: <HomeOutlined />,
    label: "看板",
  },
]

export default createBrowserRouter(routes, {
  basename: "/admin",
})
