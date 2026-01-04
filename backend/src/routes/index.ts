import { Router } from "express";
import ingestRoutes from "./terms.ingest";
import analyticsRoutes from "./terms.analytics";

const router = Router();

// ingestion + timeseries
router.use("/terms", ingestRoutes);

// analytics
router.use("/terms/analytics", analyticsRoutes);

export default router;
