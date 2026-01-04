import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import "./cron/update.cron";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(routes);

  app.listen(3001, () => {
    console.log("API running at http://localhost:3001");
  });
});
