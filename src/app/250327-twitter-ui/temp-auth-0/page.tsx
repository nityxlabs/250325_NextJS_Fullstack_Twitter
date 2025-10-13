/*
LAST:
1. I think I finished UI as I now I am at video point https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:40:00
  1. LAST: I wrote up "sign-up", "login", and "logout"

NEXT
1. NEXT: watch https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:54:00 - I think I will be working with the `/me` path next
  1. NOTE: source on document - https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md

STEPS - set up SignUp0A component
1. set up mobile view
1. see mobile view
1. set up desktop view
1. see desktop view

1. Check accessibility checklist: Webpack_React_Learn/250227_NextJS_Setup/250618-html-accessibility-checklist.md
*/

"use client";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../ui-components/common/loading-spinner-0";
import RoundButton from "@/app/_general-ui-components/round-button-v0";

// services
import { authGetMe } from "../services/auth-service";

export default function TempAuthPage(): React.JSX.Element {
  const {
    data: userAuthData,
    isLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: authGetMe,
  });

  console.log("userAuthData = ", userAuthData);

  return (
    // <section className="u-h-100vh u-w-100vw u-flex u-flex-col u-jc-center u-ai-center u-bg-black u-fg-white">
    <main className="h-screen w-full flex flex-col justify-center items-center text-white">
      <h1>TempAuth</h1>

      {isLoading && <LoadingSpinner size="lg" />}

      <RoundButton color="green800" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/login"
        >
          /250327-twitter-ui/login
        </Link>
      </RoundButton>
      <br />

      <RoundButton color="pink600" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/signup"
        >
          /250327-twitter-ui/signup
        </Link>
      </RoundButton>
      <br />

      <RoundButton color="blue700" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/home-container/home"
        >
          /250327-twitter-ui/home-container/home
        </Link>
      </RoundButton>
    </main>
  );
}
