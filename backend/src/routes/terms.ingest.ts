import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Term } from "../entity/Term";
import { Timeseries } from "../entity/Timeseries";
import { fetchMuckrackTimeseries } from "../services/muckrack.service";

const router = Router();

// ingest keyword
router.post("/:term", async (req, res) => {
  const keyword = req.params.term.toLowerCase().trim();

  const termRepo = AppDataSource.getRepository(Term);
  const tsRepo = AppDataSource.getRepository(Timeseries);

  let term = await termRepo.findOne({ where: { keyword } });

  if (!term) {
    term = termRepo.create({ keyword });
    await termRepo.save(term);
  }

  const series = await fetchMuckrackTimeseries(keyword);

  // clear existing timeseries to keep ingestion idempotent
  await tsRepo.delete({ term: { id: term.id } });

  for (const point of series) {
    const ts = tsRepo.create({
      date: point.date,
      value: point.value,
      term,
    });
    await tsRepo.save(ts);
  }

  res.json({ success: true });
});

// get timeseries to draw a graph
router.get("/:term/timeseries", async (req, res) => {
  const keyword = req.params.term;

  const termRepo = AppDataSource.getRepository(Term);

  const term = await termRepo.findOne({
    where: { keyword },
    relations: ["timeseries"],
  });

  if (!term) {
    return res.status(404).json({ error: "Term not found" });
  }

  const data = term.timeseries
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(p => ({
      date: p.date,
      value: p.value,
    }));

  res.json(data);
});

export default router;
