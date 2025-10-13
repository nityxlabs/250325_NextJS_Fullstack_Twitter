import User from "../models/user.model.ts";

// utils
import {
  isEmailValid,
  isPasswordValid,
  isPasswordCorrect,
} from "../utils/auth-utils.ts";
import { hashString } from "../utils/encryption.ts";

export function AuthService(UserModel = User) {
  async function signup({
    email,
    fullName,
    password,
    username,
    saltLength = 10, // default salt length
  }: {
    email: string;
    fullName: string;
    password: string;
    username: string;
    saltLength?: number;
  }): Promise<{ data: any; success: boolean }> {
    // check if email is valid
    if (!isEmailValid(email)) {
      return { data: "Invalid email address", success: false };
    }

    // check if password is valid
    if (!isPasswordValid(password)) {
      return { data: "Invalid password", success: false };
    }

    // check if username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return { data: "username already exists", success: false };
    }

    // check if email alread exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return { data: "email already exists", success: false };
    }

    // hash password
    // TODO - MK-Q: How does bcrypt.hash() work?
    const hashedPassword = await hashString(password, saltLength);

    // create new user
    const newUser = new UserModel({
      email,
      fullName,
      password: hashedPassword,
      username,
    });

    // TODO: testing - remove
    console.log("/api/auth/signup endpoint hit: newUser = ", newUser);

    if (!newUser) {
      return { data: "Invalid user data", success: false };
    }

    // save new user
    // TODO: uncomment when I actually want to save users to MongoDB
    await newUser.save();

    const result = {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      username: newUser.username,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    };

    return { data: result, success: true };
  }

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ data: any; success: boolean }> {
    // find user in database
    const user = await UserModel.findOne({ username });
    // compare password to stored password
    // const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    const checkPassword = await isPasswordCorrect(password, user?.password);

    if (!user || !checkPassword) {
      return { data: "Invalid username or password", success: false };
    }

    const result = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    };

    return { data: result, success: true };
  }

  async function getMe(
    userId: string
  ): Promise<{ data: any; success: boolean }> {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return { data: user, success: false };
    }

    return { data: user, success: true };
  }

  return {
    signup,
    login,
    getMe,
  };
}

export const authService = AuthService(User);
