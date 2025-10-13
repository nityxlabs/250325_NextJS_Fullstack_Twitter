import express from "express";

import { protectRoute } from "../middleware/protect-route.ts";

import {
  commentOnPost,
  createPost,
  deleteCommentOnPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.ts";

const router = express.Router();

router.get("/test", (request, response) => {
  response.json({
    data: "Post.routes - test route",
  });
});

/*
TODO: I think a more appropriate routes would be
Source: https://restfulapi.net/resource-naming/
post('/tweet');
post('/tweet/:id/like');
post('/tweet/:id/comment');
delete('/tweet/:id')
*/

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
// TODO: I think `router.get("/likes/:id")` should be in `user.routes.ts` and should be `router.get("/:id/likes")`
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/users/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPost);
router.post("/likes/:id", protectRoute, likeUnlikePost);
router.post("/comments/:id", protectRoute, commentOnPost);

router.delete("/:id", protectRoute, deletePost);
router.delete("/comments/:id", protectRoute, deleteCommentOnPost);

export default router;
