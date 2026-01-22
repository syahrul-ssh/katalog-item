import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
    migrations: ["dist/src/migrations/*.js"],
    synchronize: false,
});