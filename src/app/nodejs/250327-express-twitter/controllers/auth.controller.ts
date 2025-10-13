import { authService } from "../services/auth-service.ts";

import { generateTokenAndSetCookie } from "../utils/generate-token.ts";

// NOTE: I think "@/app" doesn't work because it is configured for NextJS but not NodeJS. Maybe I can set it up for NodeJS later?
// import { COOKIE_JWT_KEY } from "@/app/constants.ts";
import { COOKIE_JWT_KEY } from "../../../constants.ts";

export async function signup(request: any, response: any) {
  try {
    const { email, fullName, password, username } = request.body;

    const result = await authService.signup({
      email,
      fullName,
      password,
      username,
    });
    const { data, success } = result;
    // if not success, then return error
    if (!success) {
      return response.status(400).json({
        error: data,
      });
    }

    const newUser = data;
    generateTokenAndSetCookie(newUser._id, response);

    return response.status(201).json(newUser);
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in signup controller: ", error.message);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function login(request: any, response: any) {
  try {
    const { username, password } = request.body;

    const result = await authService.login({ username, password });
    const { data, success } = result;
    // if not success, then return error
    if (!success) {
      return response.status(400).json({
        error: data,
      });
    }

    const user = data;
    // create token and assign to cookie
    generateTokenAndSetCookie(user._id, response);

    return response.status(200).json(user);
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in login controller: ", error.message);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function logout(request: any, response: any) {
  try {
    // clear the cookie by setting the maxAge to 0
    // ? Q: should I use `COOKIE_JWT_KEY` here instead of string "jwt"
    // response.cookie("jwt", "", { maxAge: 0 });
    response.cookie(COOKIE_JWT_KEY, "", { maxAge: 0 });
    response.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in logout controller: ", error.message);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}

export async function getMe(request: any, response: any) {
  try {
    // TODO: testing
    // console.log("CONTROLLER: getMe - request.user._id = ", request.user._id);

    const user = await authService.getMe(request.user._id);
    response.status(200).json(user);
  } catch (error: any) {
    console.log("Error in getMe controller: ", error.message);
    response
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

/*
* NOTE: this are functions that do not use AuthService

export async function signup_OLD(request: any, response: any) {
  try {
    const { email, fullName, password, username } = request.body;

    const result = authService.signup({ email, fullName, password, username });

    // check if email is valid
    if (!isEmailValid(email)) {
      return response.status(400).json({
        error: "Invalid email address",
      });
    }

    // check if password is valid
    if (!isPasswordValid(password)) {
      return response.status(400).json({
        error: "Invalid password",
      });
    }

    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "username already exists",
      });
    }

    // check if email alread exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return response.status(400).json({
        error: "email already exists",
      });
    }

    // hash password
    // TODO - MK-Q: How does bcrypt.hash() work?
    const saltLength = 10; // default salt length
    const hashedPassword = await hashString(password, saltLength);

    // create new user
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      username,
    });

    // TODO: testing - remove
    console.log("/api/auth/signup endpoint hit: newUser = ", newUser);

    // TODO: Uncomment later
    // if (newUser) {
    //   // TODO - MK-Q: How does `generateTokenAndSetCookie()` work?
    //   // generate token and set cookie
    //   generateTokenAndSetCookie(newUser._id, response);
    //   // save user to database
    //   await newUser.save();

    //   response.status(201).json({
    //     _id: newUser._id,
    //     email: newUser.email,
    //     fullName: newUser.fullName,
    //     username: newUser.username,
    //     followers: newUser.followers,
    //     following: newUser.following,
    //     profileImg: newUser.profileImg,
    //     coverImg: newUser.coverImg,
    //   });
    // } else {
    //   return response.status(400).json({ error: "Invalid user data" });
    // }

    // TODO: testing - remove later
    if (newUser) {
      response.status(201).json(newUser);
    } else {
      return response.status(400).json({ error: "TEST - Invalid user data" });
    }
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in signup controller: ", error.message);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}


export async function login_OLD(request: any, response: any) {
  try {
    const { username, password } = request.body;
    // find user in database
    const user = await User.findOne({ username });
    // compare password to stored password
    // const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    const checkPassword = await isPasswordCorrect(password, user?.password);

    if (!user || !checkPassword) {
      return response
        .status(400)
        .json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, response);

    response.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in login controller: ", error.message);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
}
*/
