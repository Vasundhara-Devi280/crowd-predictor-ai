import express from "express";

import {
  createCrowdReport,
  getCrowdReports,
} from "../controllers/crowdController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCrowdReport);

router.get("/", getCrowdReports);

export default router;