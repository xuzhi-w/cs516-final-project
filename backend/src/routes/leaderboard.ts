import express from "express";
import {
  createLeaderboardEntryController,
  getLeaderboardController,
} from "../controllers/leaderboard";

const router = express.Router();

router.post("/", createLeaderboardEntryController);
router.get("/", getLeaderboardController);

export default router;