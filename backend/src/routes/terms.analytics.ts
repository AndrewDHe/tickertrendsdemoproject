import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Term } from "../entity/Term";

const router = Router();

//read all term's timeseries and calculate growth rate
router.get("/growth", async (_req, res) => {
  const termRepo = AppDataSource.getRepository(Term);

  const terms = await termRepo.find({
    relations: ["timeseries"],
  });

  const result = terms
    .map(term => {
      if (!term.timeseries || term.timeseries.length < 2) {
        return null;
      }

      const sorted = [...term.timeseries].sort(
        (a, b) => a.date.localeCompare(b.date)
      );

      const first = sorted[0].value;
      const last = sorted[sorted.length - 1].value;

      if (first === 0) return null;

      const growth = ((last - first) / first) * 100;

      return {
        keyword: term.keyword,
        growth: Number(growth.toFixed(2)),
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.growth - a.growth);

  res.json(result);
});

export default router;
