import Link from "next/link";

import RoundButton from "@/app/_general-ui-components/round-button-v0";

export default async function Exp0TestPath({
  params,
}: {
  params: Promise<{ testId: string }>;
}): Promise<React.ReactNode> {
  const testId = (await params).testId;

  // TODO: testing
  console.log("Exp0TestPath - params = ", await params);
  console.log("Exp0TestPath - testId = ", testId);

  return (
    <section className="u-h-100vh u-w-100vw u-flex u-jc-center u-ai-center u-bg-blue-azure u-fg-white">
      <h3>Exp0: Test Path: TestId</h3>
      <p>TestId = {testId}</p>

      <RoundButton color="greenForest" handleClick={undefined}>
        <Link className="u-fg-white u-text-decoration-none" href="/">
          Home
        </Link>
      </RoundButton>
    </section>
  );
}
