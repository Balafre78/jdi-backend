type Config = {
  port: number;
  nodeEnv: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwtSecret: string;
};

export const Config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "api",
    password: process.env.DB_PASS || "apipass",
    database: process.env.DB_NAME || "justdoit"
  },
  jwtSecret: process.env.JWT_SECRET || "SECRET_KEY_BLABLA_CHANGE_ME"
};
