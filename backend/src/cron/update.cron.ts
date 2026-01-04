import cron from "node-cron";
import { AppDataSource } from "../data-source";
import { Term } from "../entity/Term";
import { fetchMuckrackTimeseries } from "../services/muckrack.service";

cron.schedule("* * * * *", async () => {
  console.log("[CRON] triggered at", new Date().toLocaleString());

  const repo = AppDataSource.getRepository(Term);
  const terms = await repo.find();

  for (const term of terms) {
    console.log(`[CRON] would refresh term: ${term.keyword}`);
  }

  console.log("[CRON] finished");
});

