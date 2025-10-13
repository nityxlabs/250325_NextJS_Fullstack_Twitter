/*
STEPS - how to set up simple route.js app here
1. ??
1. need POST that will pass in:
    1. email
    1. username
    1. fullname
    1. password
1. need service for sign-up
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextRequest, NextResponse } from "next/server";

import { authService } from "@/app/nodejs/250327-express-twitter/services/auth-service";

// ! TODO-LATER: This POST is still not done - I need to learn how to assign `cookies` and also how to set middleware - do this after I have learned how to do this with NodeJS
export async function POST(request: Request) {
  try {
    // console.log("MUZ-POST 4: signup - request.body = ", request.body);

    const body = await request.json();
    const { email, fullName, password, username } = body;

    // TODO: testing
    // console.log("MUZ-POST 4: signup - email = ", email);
    // console.log("MUZ-POST 4: signup - fullName = ", fullName);

    const result = await authService.signup({
      email,
      fullName,
      password,
      username,
    });

    const { data, success } = result;
    if (!success) {
      const responseBody = {
        error: data,
      };
      const options = {
        status: 400,
        headers: { "Content-Type": "application/json" },
      };

      return NextResponse.json(responseBody, options);
    }

    // ! TODO: I need to figure out a way to set cookies in NextJS
    const newUser = data;
    // generateTokenAndSetCookie(newUser._id, response);

    const responseBody = newUser;
    const options = {
      status: 201,
      headers: { "Content-Type": "application/json" },
    };

    return NextResponse.json(responseBody, options);
  } catch (error: any) {
    // TODO: testing - remove
    console.log("Error in signup controller: ", error.message);

    const responseBody = {
      error: "Internal server error",
      message: error.message || "Something went wrong",
    };
    const options = {
      status: 500,
      headers: { "Content-Type": "application/json" },
    };

    return NextResponse.json(responseBody, options);
  }
}
