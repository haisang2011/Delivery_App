type EnvironmentType = 'development' | 'testing' | 'production';

interface Environment {
  dbHost: string;
  dbName: string;
  port: number;
}

const NODE_ENV: EnvironmentType = 'development';

const getEnvironment = (): Environment => {
  if (NODE_ENV === 'development') {
    return {
      dbHost: `${process.env.DB_HOST}:27017` || 'localhost:27017',
      dbName: process.env.DB_NAME || 'storedb',
      port: Number(process.env.SERVER_PORT) || 3002,
    }
  }

  // This section to extend in future when the project is deployed on internet
  // "testing" | "production"
  return {
    dbHost: process.env.DB_HOST || 'localhost:27017',
    dbName: process.env.DB_NAME || 'storedb',
    port: Number(process.env.SERVER_PORT) || 3002,
  }
}

export default getEnvironment();