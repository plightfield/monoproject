#!/bin/bash

# 如果任何命令失败，立即退出
set -e

# 构建 Docker 镜像
echo "正在构建 Docker 镜像..."
docker compose build

# 停止并移除容器
echo "正在停止并移除容器..."
docker compose down

# 以分离模式启动服务
echo "正在启动服务..."
docker compose up -d

# 清理悬空的镜像和其他未使用的 Docker 对象
echo "正在清理 Docker..."
docker system prune -af

echo "部署成功完成！"
