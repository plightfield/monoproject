import { dbVersionCols, pingHisCols } from "./models/base"

// 迁移脚本，掌控数据库
export default async function migrate() {
  const version = await dbVersionCols().findOne({
    tag: "base",
  })
  const v = version ? version.version : 0
  if (!version) {
    await dbVersionCols().insertOne({
      tag: "base",
      version: 0,
    })
  }
  if (v === 0) {
    // 1 版本数据库处理，可以添加/删除索引，mongo schema
    // schema 中如果要传入 zod，需要稍加改造，建议仅在敏感文档中使用
    await pingHisCols().createIndex({ time: -1 })
    await dbVersionCols().updateOne({ tag: "base" }, { $set: { version: 1 } })
    console.info("迁移到数据库版本 v.1")
  }
  return v
}
