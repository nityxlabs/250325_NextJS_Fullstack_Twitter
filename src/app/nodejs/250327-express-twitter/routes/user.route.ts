// Source: https://www.youtube.com/watch?v=4GUVz2psWUg @1:11:00
import express from "express";

import { protectRoute } from "../middleware/protect-route.ts";
import {
  getSuggestedUser,
  getUserProfile,
  followUnfollowUser,
  updateUser,
} from "../controllers/user.controller.ts";

const router = express.Router();

router.get("/test", (request, response) => {
  response.json({
    data: "Just a user.routes /test route",
  });
});

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/follow/:id", protectRoute, followUnfollowUser);
// TODO: Q - should update be `router.put("/profile/:username", protectedRoute, updateUser);
router.post("/update", protectRoute, updateUser);

export default router;
