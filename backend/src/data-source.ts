import "reflect-metadata";
import { DataSource } from "typeorm";
import { Term } from "./entity/Term";
import { Timeseries } from "./entity/Timeseries";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "tickertrends",
  synchronize: true,
  entities: [Term, Timeseries],
});
