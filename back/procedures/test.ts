import { dbVersionCols } from "../models/base"

export default async function testService() {
  const v = await dbVersionCols().findOne({
    tag: "base",
  })
  console.log(`v.${v?.version || 0}版本服务器运行正常`)
}
