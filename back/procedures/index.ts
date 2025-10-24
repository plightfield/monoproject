import cron from "node-cron"
import testService from "./test"

export default function runProcedures() {
  // 每 10 秒执行一次
  cron.schedule("*/10 * * * * *", testService, {
    timezone: "Asia/Shanghai",
  })
}
