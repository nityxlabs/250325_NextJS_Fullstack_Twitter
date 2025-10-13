/*
NOTE: the middleware file needs to be in the "src" folder
*/

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { headers, cookies } from "next/headers";

import { COOKIE_JWT_KEY } from "./app/constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function testMiddleware0(request: NextRequest) {
  // Method: see how `middleware` works in NextJS and see if I can make call to backend
  // console.log("Middleware running for: ", request.nextUrl);
  // console.log("request.cookies: ", request.cookies);

  const apiRouteTest = "http://localhost:8000/nodejs/api/auth/test";

  const backendResponse = await fetch(apiRouteTest);
  const data = await backendResponse.json();

  console.log("backendResponse.ok = ", backendResponse.ok);
  console.log("backendResponse data = ", data);

  // TODO: testing - can I make call to NodeJS backend

  // Example: protect certain routes
  const token = request.cookies.get("token")?.value;
  console.log("testMiddleware0 - token = ", token);

  // // if not authenticated
  // if (
  //   !token &&
  //   request.nextUrl.pathname.startsWith("/250327-twitter-ui/home-container")
  // ) {
  //   const loginUrl = new URL("/250327-twitter-ui/login");
  //   return NextResponse.redirect(loginUrl);
  // }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function testMiddleware1_authGetMe(request: NextRequest) {
  // METHOD: see if user is authenticated by checking token
  const sessionTokenJWT = request.cookies.get(COOKIE_JWT_KEY)?.value;
  const cookieStore = await cookies();

  console.log(
    "testMiddleware1_authGetMe: sessionTokenJWT = ",
    sessionTokenJWT,
    " \n cookieStore = ",
    cookieStore
  );

  const apiRouteAuthMe = "http://localhost:8000/nodejs/api/auth/me";
  const response = await fetch(apiRouteAuthMe);

  const data = await response.json();
  // if (!response.ok) {
  //   return;
  // }
  console.log("testMiddleware1_authGetMe: data = ", data);
  console.log("testMiddleware1_authGetMe: data = ", data);
}

async function checkUserAuthenticatedMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  // Method 1: get user session token
  // const sessionTokenJWT = request.cookies.get(COOKIE_JWT_KEY)?.value;
  // Method 2: get user session token
  const cookieStore = await cookies();
  const sessionTokenJWT = cookieStore.get(COOKIE_JWT_KEY)?.value;

  // if user logged in - send to home page
  if (request.nextUrl.pathname === "/250327-twitter-ui/login") {
    if (sessionTokenJWT) {
      return NextResponse.redirect(
        new URL("/250327-twitter-ui/home-container/home", request.nextUrl)
      );
      // NOTE: `rewrite` does the same thing but does not change the path in the URL
      // return NextResponse.rewrite(new URL("/250327-twitter-ui/home-container/home"));
    }
  }

  // if user not logged in - send to login page
  if (
    request.nextUrl.pathname.startsWith("/250327-twitter-ui/home-container")
  ) {
    if (!sessionTokenJWT) {
      return NextResponse.redirect(
        new URL("/250327-twitter-ui/login", request.nextUrl)
      );
      // NOTE: `rewrite` does the same thing but does not change the path in the URL
      // return NextResponse.rewrite(new URL("/250327-twitter-ui/home-container/home"));
    }
  }

  return response;
}

export async function middleware(request: NextRequest) {
  // TODO: I think I may need to `/me` path from NodeJS?? Why doesn't this page trigger? I should see console.logs() in the terminal window

  // testMiddleware0(request);
  // testMiddleware1_authGetMe(request);

  let response = NextResponse.next();
  // NOTE: need to use this response object in order to perform redirect
  response = await checkUserAuthenticatedMiddleware(request, response);

  return response;

  /*
  console.log("Middleware running for: ", request.nextUrl.pathname);
  console.log("request.cookies: ", request.cookies);

  // Example: protect certain routes
  const token = request.cookies.get("token")?.value;

  // if not authenticated
  if (
    !token &&
    request.nextUrl.pathname.startsWith("/250327-twitter-ui/home-container")
  ) {
    const loginUrl = new URL("/250327-twitter-ui/login");
    return NextResponse.redirect(loginUrl);
  }

  // ! TODO: need to set up redirect if user is logged in
  if (
    token &&
    request.nextUrl.pathname.startsWith("/250327-twitter-ui/login")
  ) {
    const homeUrl = new URL("/250327-twitter-ui/home-container");
    return NextResponse.redirect(homeUrl);
  }

  // let the request continue
  return NextResponse.next();
  */
}

// Apply middleware only to matching routes
// export const config = {
//   // matcher: ['/dashboard/:path*', ], // applies to /dashboard and subroutes
//   matcher: [
//     "/250327-twitter-ui/home-container/:path*",
//     "/250327-twitter-ui/login/:path*",
//   ], // applies to /dashboard and subroutes
// };

/*
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);

  // Example: Protect certain routes
  const token = request.cookies.get('token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Let request continue
  return NextResponse.next();
}

// Apply middleware only to matching routes
export const config = {
  matcher: ['/dashboard/:path*'], // applies to /dashboard and subroutes
};
*/
