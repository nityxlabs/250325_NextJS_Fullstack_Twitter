import { v2 as cloudinary } from "cloudinary";

// models
import Notification from "../models/notification.model.ts";
import User from "../models/user.model.ts";

// utils
import { isPasswordCorrect, isPasswordValid } from "../utils/auth-utils.ts";
import { hashString } from "../utils/encryption.ts";

export async function getUserProfile(request: any, response: any) {
  const { username } = request.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    return response.status(200).json(user);
  } catch (error: any) {
    console.log("Error in getUserProfile: ", error.message);
    return response.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function handleFollowUser({
  userToFollowId,
  currentUserId,
}: {
  userToFollowId: any;
  currentUserId: any;
}) {
  // `currentUserId` will follow `userToFollowId`
  await User.findByIdAndUpdate(userToFollowId, {
    $push: { followers: currentUserId },
  });
  // add followee to follower
  await User.findByIdAndUpdate(currentUserId, {
    $push: { following: userToFollowId },
  });
}

export async function handleUnfollowUser({
  userToFollowId,
  currentUserId,
}: {
  userToFollowId: any;
  currentUserId: any;
}) {
  // `currentUserId` will no longer follower `userToFollowId`
  await User.findByIdAndUpdate(userToFollowId, {
    $pull: { followers: currentUserId },
  });
  // remove followee from follower
  await User.findByIdAndUpdate(currentUserId, {
    $pull: { following: userToFollowId },
  });
}

export async function followUnfollowUser(request: any, response: any) {
  const { id } = request.params;

  try {
    // TODO: testing
    // console.log("MUZ.TEST 1:\n id = ", id, "\n request.user = ", request.user);

    if (id === request.user._id.toString()) {
      return response
        .status(400)
        .json({ error: "User cannot follow/unfollow themselves" });
    }

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(request.user._id);

    // TODO: testing
    // console.log(
    //   "MUZ.TEST 2:\n userToFollow = ",
    //   userToFollow,
    //   "\n currentUser = ",
    //   currentUser
    // );

    if (!userToFollow) {
      return response
        .status(400)
        .json({ error: "User to follow is not found" });
    }

    if (!currentUser) {
      return response.status(400).json({ error: "Current user is not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    // TODO: testing
    // console.log(
    //   "MUZ.TEST 4: \n isFollowing = ",
    //   isFollowing,
    //   " \n id = ",
    //   id,
    //   " \n typeof id = ",
    //   typeof id,
    //   " \n request.user._id = ",
    //   request.user._id,
    //   " \n type request.user._id = ",
    //   typeof request.user._id
    // );

    let followingMessage = "";
    if (isFollowing) {
      await handleUnfollowUser({
        userToFollowId: userToFollow._id,
        currentUserId: currentUser._id,
      });
      followingMessage = "User unfollowed successfully";
    } else {
      await handleFollowUser({
        userToFollowId: userToFollow._id,
        currentUserId: currentUser._id,
      });
      followingMessage = "User followed successfully";
    }

    // create new notification
    const newNotification = new Notification({
      from: currentUser._id,
      to: userToFollow._id,
      type: "follow",
      read: false,
    });
    // save notification
    await newNotification.save();

    // TODO: return the id of the user as a response (I'm assuming `userToFollow`)
    return response.status(200).json({ message: followingMessage });
  } catch (error: any) {
    return response.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getSuggestedUser(request: any, response: any) {
  try {
    const currentUserId = request.user._id;

    // NOTE: `usersFollowByMe` returns an object {_id: currentUserId, following: [list-of-users-being-followed]}
    const usersFollowedByMe = await User.findById(currentUserId).select(
      "following"
    );

    // TODO: testing - remove
    // console.log(
    //   "getSuggestedUser(): usersFollowedByMe = ",
    //   usersFollowedByMe
    // );

    // retrieve all users in database that are not me (i.e. not `curretntUserId`)
    const users = await User.aggregate([
      {
        // CONJ: I think this is all users that are not `currentUserId`
        $match: {
          // $ne = not equal to
          _id: { $ne: currentUserId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    // exclude users that I am already following
    const filteredUsers = users.filter(
      (user: any) => !usersFollowedByMe?.following.includes(user._id)
    );
    // only select first X (x=4) users
    const suggestedUsers = filteredUsers.slice(0, 4);

    // remove the password from being passed in response - 2 ways to do it as shown below
    // suggestedUsers.forEach((user: any) => user.password = null);
    suggestedUsers.forEach((user: any) => delete user.password);

    return response.status(200).json(suggestedUsers);
  } catch (error: any) {
    console.log("Error in getSuggestedUser: ", error.message);
    return response.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Something went awry",
    });
  }
}

export async function checkIfUserPasswordBeUpdated({
  actualUserPassword,
  enteredCurrentPassword,
  enteredNewPassword,
}: {
  actualUserPassword: string;
  enteredCurrentPassword: string;
  enteredNewPassword: string;
}): Promise<{ success: boolean; message: string }> {
  // need to make sure both `enteredCurrentPassword`
  if (
    (!enteredCurrentPassword && enteredNewPassword) ||
    (enteredCurrentPassword && !enteredNewPassword)
  ) {
    return {
      success: false,
      message: "Please provide both current password & new password",
    };
  }

  // if both passwords are entered, then continue with password check
  if (enteredCurrentPassword && enteredNewPassword) {
    const isMatch = await isPasswordCorrect(
      enteredCurrentPassword,
      actualUserPassword
    );
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }

    // check if password is valid
    if (!isPasswordValid(enteredNewPassword)) {
      return { success: false, message: "New password is not valid" };
    }
  }

  return { success: true, message: "" };
}

export async function updateUser(request: any, response: any) {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    request.body;
  let { profileImg, coverImg } = request.body;

  // TODO: testing - why do I see error with profileImg
  // console.log("MUZ.backend.updateUser - profileImg = ", profileImg);
  // console.log(
  //   "MUZ.backend.updateUser - coverImg = ",
  //   typeof coverImg,
  //   " & null = ",
  //   coverImg === null
  // );

  const userId = request.user._id;

  try {
    // retrieve user
    let user = await User.findById(userId);
    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    // if both currentPassword & newPassword are entered, then this means user wants to update password
    if (currentPassword && newPassword) {
      // then perform check here - `canUserPasswordBeUpdated()`

      const canUserPasswordBeUpdated = await checkIfUserPasswordBeUpdated({
        actualUserPassword: user.password,
        enteredCurrentPassword: currentPassword,
        enteredNewPassword: newPassword,
      });

      if (!canUserPasswordBeUpdated.success) {
        return response.status(400).json({
          error: canUserPasswordBeUpdated.message,
        });
      }

      // hash new password
      const saltLength = 10; // default salt length
      const hashedNewPassword = await hashString(newPassword, saltLength);
      // update password to new password
      user.password = hashedNewPassword;
    }

    // check if profileImg is updated
    if (profileImg) {
      // To save space in cloudinary,if user already has an older profile image, delete it before updating to new image
      if (user.profileImg) {
        // Example of image link: https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        const imageId: string = (
          user.profileImg.split("/").pop() as string
        ).split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    // check if coverImg is updated
    if (coverImg) {
      // To save space in cloudinary, if user already has an older cover image, delete it before updating to new image
      if (user.coverImg) {
        // Example of image link: https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        const imageId: string = (
          user.coverImg.split("/").pop() as string
        ).split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    // update all fields for user
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    // save user to database
    user = await user.save();

    // remove password so it is not sent in response. NOTE: this will not modify the actual user data in the database since this happens after `user.save();`
    user.password = null as any;

    return response.status(200).json(user);
  } catch (error: any) {
    console.log("Error in updateUser: ", error.message);
    return response.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Something went awry",
    });
  }
}
