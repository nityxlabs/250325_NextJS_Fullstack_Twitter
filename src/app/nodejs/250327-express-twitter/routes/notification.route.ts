import express from "express";

import { protectRoute } from "../middleware/protect-route.ts";

import {
  deleteNotifications,
  deleteSingleNotification,
  getNotifications,
} from "../controllers/notification.controller.ts";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteSingleNotification);

export default router;
