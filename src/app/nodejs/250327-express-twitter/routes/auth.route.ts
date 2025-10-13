// Source: https://www.youtube.com/watch?v=4GUVz2psWUg @17:12
import express from "express";

import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.ts";
import { protectRoute } from "../middleware/protect-route.ts";

const router = express.Router();

router.get("/test", (request, response) => {
  response.json({
    data: "Just an auth.routes /test route",
  });
});

// route /me: verify if current user (me) is logged in
router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
