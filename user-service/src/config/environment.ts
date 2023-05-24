import { Logger } from "@nestjs/common";

type EnvironmentType = 'development' | 'testing' | 'production';

interface Environment {
  dbHost: string;
  dbName: string;
  port: number;
  mailHost: string;
  smtpUsername: string;
  smtpPassword: string;
  redisHost: string;
  redisPort: number;
}

const NODE_ENV: EnvironmentType = 'development';

const getEnvironment = (): Environment => {  
  if (NODE_ENV === 'development') {
    return {
      dbHost: process.env.DB_HOST ? `${process.env.DB_HOST}:27017` : 'localhost:27017',
      dbName: process.env.DB_NAME || 'userdb',
      port: Number(process.env.SERVER_PORT) || 3001,
      mailHost: process.env.MAIL_HOST,
      smtpUsername: process.env.SMTP_USERNAME,
      smtpPassword: process.env.SMTP_PASSWORD,
      redisHost: process.env.REDIS_HOST,
      redisPort: Number(process.env.REDIS_PORT) || 6379,
    }
  }

  // This section to extend in future when the project is deployed on internet
  // "testing" | "production"
  return {
    dbHost: process.env.DB_HOST || 'localhost:27017',
    dbName: process.env.DB_NAME || 'userdb',
    port: Number(process.env.SERVER_PORT) || 3001,
    mailHost: process.env.MAIL_HOST,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    redisHost: process.env.REDIS_HOST,
    redisPort: Number(process.env.REDIS_PORT) || 6379,
  }
}

export default getEnvironment();