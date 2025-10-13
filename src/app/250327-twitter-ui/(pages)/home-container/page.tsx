import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    // default = default title when nothing defined
    default: "250327-twitter-ui: home-container",
    // template = `%s` retrieves the title of a child page
    template: "%s | Twitter Clone",
  },
  description: "Twitter Clone",
};

export default function HomeContainer() {
  return (
    // <section className="u-h-100vh u-w-100vw u-flex u-flex-col u-jc-center u-ai-center u-bg-black u-fg-white">
    <section>
      {/* <h1>25.3.27 - Twitter UI</h1>

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

      <RoundButton color="blue500" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/home"
        >
          /250327-twitter-ui/home
        </Link>
      </RoundButton>
      <br />

      <RoundButton color="amber500" handleClick={undefined}>
        <Link
          className="u-fg-white u-text-decoration-none"
          href="/250327-twitter-ui/play0-tailwind-css"
        >
          /250327-twitter-ui/play0-tailwind-css
        </Link>
      </RoundButton> */}
    </section>
  );
}
