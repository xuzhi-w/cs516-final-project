import { Router } from "express";

export const leaderBoardRoutes = Router();

leaderBoardRoutes.get("/", (req, res) => {
  res.json({
    success: true,
    data: [],
  });
});
