const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFile = require('path').resolve('../', '.env')
const env = dotenv.config({ path: envFile })

if (!env) {
  throw new Error("Couldn't find .env file")
}

module.exports = {
  /**
   * Your port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Your secret
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'warn'
  },

  /**
   * Db connection config
   */
  db: {
    host    : process.env.POSTGRES_HOST,
    user    : process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port    : process.env.POSTGRES_PORT
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api'
  },

  appRoot: require('path').dirname(envFile)
}


