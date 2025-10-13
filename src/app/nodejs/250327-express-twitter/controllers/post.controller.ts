import Notification from "../models/notification.model.ts";
import Post from "../models/post.model.ts";
import User from "../models/user.model.ts";

import { v2 as cloudinary } from "cloudinary";

export function isNewPostValid({ img, text }: { img: string; text: string }) {
  // new post is valid if either `text` or `img` is present
  return img || text;
}

export async function createPost(request: any, response: any) {
  try {
    const userId = request.user._id;
    const { text } = request.body;
    let { img } = request.body;

    // check if user is present
    const user = await User.findById(userId);
    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    // check if post is valid
    if (!isNewPostValid({ img, text })) {
      return response.status(400).json({
        error: "Post must have text or image",
      });
    }

    // upload image to cloudinary
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();

    return response.status(201).json(newPost);
  } catch (error: any) {
    console.log("post.controller createPost() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function deletePost(request: any, response: any) {
  try {
    const postId = request.params.id;
    const userId = request.user._id;

    // see if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return response.status(404).json({
        error: "post does not exist",
      });
    }

    // check if current user is allowed to delete this post. Only the author is allowed to delete this post
    if (post.user.toString() !== userId.toString()) {
      return response
        .status(401)
        .json({ error: "User is not authorized to delete this post" });
    }

    // if image is present, then delete image
    if (post.img) {
      // TODO - Q: I think I should make this a function - `getImageIdFromString()`
      const imgId = (post.img.split("/").pop() as any).split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    // delete post
    await Post.findByIdAndDelete(postId);

    response.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.log("post.controller deletePost() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function commentOnPost(request: any, response: any) {
  try {
    const userId = request.user._id;
    const postId = request.params.id;
    const { text } = request.body;

    // Make sure user exits
    const user = await User.findById(userId);
    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    // need text for comment
    if (!text) {
      response.status(400).json({ error: "Text field is required" });
    }

    // check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }

    // add comment and save
    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();

    // retrieve updated post - not sure if I like making 2 calls
    const updatedPost = await Post.findById(postId)
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    response.status(200).json(updatedPost);
  } catch (error: any) {
    console.log("post.controller commentOnPost() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function deleteCommentOnPost(request: any, response: any) {
  /*
  TODO: need to write up this function
  STEPS
  1. get post by postId -> if it does not exist, return error
  1. get userId
  1. make sure comment exists -> if not, return  error
  1. check if user wrote this post, if not, then do not allow them to delete -> return error
  1. delete comment
  1. return post without comment
  */
  try {
    const userId = request.user._id;
    const postId = request.params.id;
    const { commentIndex } = request.body;

    const post = await Post.findById(postId);
    if (!post) {
      return response.status(400).json({
        error: "Post not found",
      });
    }

    if (commentIndex < 0 || commentIndex >= post.comments.length) {
      return response.status(400).json({
        error: "Invalid comment index",
      });
    }

    const comment = post.comments[commentIndex];

    if (comment.user.toString() !== userId.toString()) {
      return response.status(400).json({
        error: "User not authorized to delete comment",
      });
    }

    // remove comment based on index number
    post.comments.splice(commentIndex, 1);
    await post.save();

    // retrieve updated post
    const updatedPost = await Post.findById(postId)
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    response.status(200).json(updatedPost);
  } catch (error: any) {
    console.log("post.controller commentOnPost() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function handleLikePost({
  post,
  userId,
}: {
  post: any;
  userId: any;
}): Promise<typeof Post> {
  post.likes.push(userId);
  await User.updateOne({ _id: userId }, { $push: { likedPosts: post._id } });
  return post;
}

export async function handleUnlikePost({
  postId,
  userId,
}: {
  postId: any;
  userId: any;
}) {
  // finds Post with `id = postId` - removes `userId` from array `likes`
  await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
  // finds User with 'id = userId` - removes `postId` from array `likedPosts`
  await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
}

export async function likeUnlikePost(request: any, response: any) {
  try {
    const userId = request.user._id;
    const { id: postId } = request.params;

    let post: any = await Post.findById(postId);
    if (!post) {
      return response.status(404).json({
        error: "Post not found",
      });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // unlike post
      handleUnlikePost({ postId, userId });

      // update post by removing current user `userId` so I can pass back the updated post data
      post.likes = post.likes.filter(
        (eachUserId: string) => eachUserId.toString() !== userId.toString()
      );

      return response.status(200).json(post);
    } else {
      // like post
      post = await handleLikePost({ post, userId });
      await post.save();

      // create new notification
      const newNotification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await newNotification.save();

      return response.status(200).json(post);
    }
  } catch (error: any) {
    console.log("post.controller likeUnlikeComment() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getAllPosts(request: any, response: any) {
  try {
    // NOTE: `createdAt: -1` means get posts for most recent to least recent
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    // check if no posts
    if (posts.length === 0) {
      return response.status(200).json([]);
    }

    return response.status(200).json(posts);
  } catch (error: any) {
    console.log("post.controller getAllPosts() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getLikedPosts(request: any, response: any) {
  try {
    // get user
    const userId = request.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // get all liked posts
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return response.status(200).json(likedPosts);
  } catch (error: any) {
    console.log("post.controller getLikedPosts() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getFollowingPosts(request: any, response: any) {
  try {
    const userId = request.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // get all posts created by user.following
    const feedPosts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return response.status(200).json(feedPosts);
  } catch (error: any) {
    console.log("post.controller getFollowingPosts() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getUserPosts(request: any, response: any) {
  try {
    const { username } = request.params;

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const userPosts = await Post.find({ user: user._id })
      // NOTE: `createdAt: -1` means get posts for most recent to least recent
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    response.status(200).json(userPosts);
  } catch (error: any) {
    console.log("post.controller getAllPosts() error: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}
