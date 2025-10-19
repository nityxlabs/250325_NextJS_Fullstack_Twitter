/*
LAST:
1. I think I finished UI as I now I am at video point https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:40:00
  1. LAST: watch https://www.youtube.com/watch?v=4GUVz2psWUg @ 5:54:00 - learning how to make production version of website - I think I should set up with Vercel
      1. LAST: added my Twitter project to Github here: https://github.com/nityxlabs/250325_NextJS_Fullstack_Twitter -> now I need to figure out how to set up Backend + Vercel - I watched video in https://www.youtube.com/watch?v=CNJkX9rYI8U @ 9:30 and I set up "index.ts" file in "250325_NextJS_Fullstack_Twitter/fullstack-twitter-app/src/app/nodejs/index.ts"

NEXT
1. NEXT: watch https://www.youtube.com/watch?v=4GUVz2psWUg @ 5:54:00 - learn how to build a production version of NextJS & NodeJS app - see "! EKHANE 25.9.28" in file: "Webpack_React_Learn/250325_NextJS_Fullstack_Twitter/fullstack-twitter-app/src/app/nodejs/250327-express-twitter/index-server.ts"
  1. NEXT: get ready to deploy my project to Vercel, but first look at how to prevent read/write to MongoDB, see "! EKHANE 25.10.5" in file: "Webpack_React_Learn/250325_NextJS_Fullstack_Twitter/fullstack-twitter-app/src/app/nodejs/250327-express-twitter/index-server.ts"
      1. NEXT: see how I can set up vercel with backend (Github: https://github.com/nityxlabs/250325_NextJS_Fullstack_Twitter) -> see video: https://www.youtube.com/watch?v=CNJkX9rYI8U @ 9:30 and since I already added index.ts, need to make and upload `vercel.json` file (as seen in video @10:25)
      1. LATER: once I figure out Vercel, then figure out AWS
  1. NOTE: source on document - https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md

! THINGS I NEED TO LEARN
- React query
  - invalidating cache
- document.cookie
- `httpOnly`, `sameSite`, `secure`, and `path` - see file "Webpack_React_Learn/250325_NextJS_Fullstack_Twitter/fullstack-twitter-app/src/app/nodejs/250327-express-twitter/utils/generate-token.ts"

1. Check accessibility checklist: Webpack_React_Learn/250227_NextJS_Setup/250618-html-accessibility-checklist.md
*/

import { Metadata } from "next";
import Link from "next/link";

import RoundButton from "@/app/_general-ui-components/round-button-v0";

export const metadata: Metadata = {
  title: {
    // default = default title when nothing defined
    default: "250327-twitter-ui",
    // template = `%s` retrieves the title of a child page
    template: "%s | Twitter Clone",
  },
  description: "Twitter Clone",
};

function TempHomeComponent() {
  return (
    <section>
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
      <br />

      <RoundButton color="amber500" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/temp-auth-0"
        >
          /250327-twitter-ui/temp-auth-0
        </Link>
      </RoundButton>
      <br />

      <div style={{ height: "50px" }}></div>

      <RoundButton color="amber500" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/play0-tailwind-css"
        >
          /250327-twitter-ui/play0-tailwind-css
        </Link>
      </RoundButton>
      <br />

      <RoundButton color="amber600" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/play1-nextjs-api-routes"
        >
          /250327-twitter-ui/play1-nextjs-api-routes
        </Link>
      </RoundButton>
    </section>
  );
}

export default function TwitterUi250327() {
  return (
    // <section className="u-h-100vh u-w-100vw u-flex u-flex-col u-jc-center u-ai-center u-bg-black u-fg-white">
    <main className="h-screen w-screen flex flex-col justify-center items-center text-white">
      <h1>25.3.27 - Twitter UI</h1>

      <TempHomeComponent />
    </main>
  );
}
