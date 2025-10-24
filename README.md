# Monoproject 项目启动模板

单个项目全栈脚手架，仅使用 vite，后端采用 fastify + trpc + mongo + redis，前端采用 react + tailwindcss，自行选择适配的框架和依赖

## 注意

1. 注意端口分配！当前项目：

- 后端：5550
- 前端：5551（测试环境）
- 数据库 mongo：5552
- redis：5553
  至少保留 4-5 个可用端口自行分配

2. https,http2,gzip 先关配置移步云厂商 cdn 控制
3. models 和 rpc 的声明要分开，以防循环依赖问题
4. 依赖只有 dependencies，不区分 dev，全栈之下不运行 -ci production，全依赖就全依赖，并不会变得太大，注意利用云厂商提供的容器镜像服务（面免费版即可）

## 运行

开发环境：`pnpm back`(后端) + `pnpm dev`(前端)

正式环境：jekins 选择脚本运行：`deploy.sh`，必要时候预先更改脚本执行权限
