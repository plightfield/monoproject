# 运行后端正式环境
FROM node:22-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --registry https://registry.npmmirror.com/
COPY . .
RUN pnpm build