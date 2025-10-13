import jwt from "jsonwebtoken";

// import { COOKIE_JWT_KEY } from "@/app/constants.ts";
// ? Q: Why isn't `@/app` working?
import { COOKIE_JWT_KEY } from "../../../constants.ts";

export function generateToken(userId: any) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as any, {
    expiresIn: "15days", // token expires in 15 days
  });
  return token;
}

export function setCookie(token: string, response: any) {
  response.cookie(COOKIE_JWT_KEY, token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevents XSS attacks (cross-site scripting attacks),
    sameSite: "strict", // prevents CSRF attacks (cross-site request forgery attacks),
    secure: process.env.NODE_ENV !== "development",
    path: "/", // Cookie available on all routes
  });
}

export function generateTokenAndSetCookie(userId: any, response: any) {
  const token = generateToken(userId);
  setCookie(token, response);
}
