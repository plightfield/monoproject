import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import "@ant-design/v5-patch-for-react-19"
import "~/index.css"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import Main from "./Main"
dayjs.locale("zh-cn")
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      card={{
        style: { border: "none", borderRadius: "16px" },
        className: "my-shadow",
      }}
    >
      <Main />
    </ConfigProvider>
  </StrictMode>
)
