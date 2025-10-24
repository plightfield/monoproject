declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      MONGO_URI: string
      MONGO_NAME: string
      REDIS_URI: string
    }
  }
}

export {}
