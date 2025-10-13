import jwt from "jsonwebtoken";

import User from "../models/user.model.ts";

// import { COOKIE_JWT_KEY } from "@/app/constants.ts";
// ? Q: Why isn't `@/app` working?
import { COOKIE_JWT_KEY } from "../../../constants.ts";

export async function protectRoute(request: any, response: any, next: any) {
  // TODO: I still need to understand how this middleware function works
  // TODO: testing - remove
  // console.log("protectRoute() - start");

  try {
    // TODO: testing - remove
    // console.log("protectRoute() - COOKIE_JWT_KEY = ", COOKIE_JWT_KEY);
    // console.log("protectRoute() - request.cookies = ", request.cookies);

    // need `app.use(cookieParser())` to extract values from cookie
    const token = request.cookies[COOKIE_JWT_KEY];

    // TODO: testing
    // console.log("protectRoute() - request.cookies = ", request.cookies);
    // console.log("protectRoute() - token = ", token);

    // if no token, then this means the user is not logged in
    if (!token) {
      return response
        .status(401)
        .json({ error: "Unauthorized: No Token Provided" });
    }

    // TODO: testing - remove
    // console.log("protectRoute() = token: ", token);

    // check if the token is valid
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as any);
    if (!decoded) {
      return response
        .status(401)
        .json({ error: "Unauthorized: Invalid Token" });
    }

    // TODO: testing - remove
    // console.log("protectRoute() = decoded: ", decoded);

    const user = await User.findById(decoded.userId).select("-password");

    // TODO: testing - remove
    // console.log("protectRoute() = user: ", user);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    request.user = user;
    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware: ", error.message);
    return response
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}
