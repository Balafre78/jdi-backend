import { DataSource } from "typeorm";
import { Config } from "./config";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: Config.database.host,
    port: Config.database.port,
    username: Config.database.username,
    password: Config.database.password,
    database: Config.database.database,
    synchronize: Config.nodeEnv === 'development',
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})
