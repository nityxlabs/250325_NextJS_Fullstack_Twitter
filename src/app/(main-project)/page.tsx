import { Metadata } from "next";
import Link from "next/link";

import RoundButton from "@/app/_general-ui-components/round-button-v0";

export const metadata: Metadata = {
  title: {
    // default = default title when nothing defined
    default: "Fullstack: Twitter",
    // template = `%s` retrieves the title of a child page
    template: "%s | Fullstack Twitter",
  },
  description: "Practice Fullstack Twitter",
};

export default function Home(): React.JSX.Element {
  return (
    <div className="u-h-100vh u-w-100% u-bg-black-2 u-fg-white">
      <h1>Fullstack: Twitter v0.0.1</h1>

      <h1 className="u-font-weight-md u-text-decoration-underline">
        Hello, Next.js!
      </h1>

      <RoundButton color="blue500" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui"
        >
          /250327-twitter-ui
        </Link>
      </RoundButton>

      <RoundButton color="red800" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/exp0-test-path/4"
        >
          /exp0-test-path/4
        </Link>
      </RoundButton>
    </div>
  );
}
