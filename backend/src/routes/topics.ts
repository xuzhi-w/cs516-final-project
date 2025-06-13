import { Router } from "express";

export const topicRoutes = Router();

topicRoutes.get("/", (req, res) => {
  res.json({
    success: true,
    data: [],
    count: 0,
  });
});
