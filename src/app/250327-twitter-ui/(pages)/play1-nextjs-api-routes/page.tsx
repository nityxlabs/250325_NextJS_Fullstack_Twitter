"use client";

import { useState } from "react";

import RoundButton from "@/app/_general-ui-components/round-button-v0";

function TestApiRoutes0() {
  /*
  STEPS - make call to endpoing
  1. ???
  1. have button for GET
  */
  const [status, setStatus] = useState("idle");

  async function testGet() {
    setStatus("pending");

    try {
      const response = await fetch(
        "/250327-twitter-ui/play1-nextjs-api-routes/api/test-0"
      );

      console.log("testGet: response = ", response);
      console.log("testGet: response.ok = ", response.ok);

      if (!response.ok) {
        throw new Error("testGet() response is not ok");
      }

      const data = await response.json();

      console.log("testGet(): data = ", data);

      setStatus("success");
    } catch (error: any) {
      console.warn("testGet: error = ", error);

      setStatus("error");
    }
  }

  async function testPost(shouldError: boolean) {
    setStatus("pending");

    const mockPayload = {
      name: "Plusle",
      shouldError,
    };

    try {
      const response = await fetch(
        "/250327-twitter-ui/play1-nextjs-api-routes/api/test-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockPayload),
        }
      );

      console.log("testPost: response = ", response);
      console.log("testPost: response.ok = ", response.ok);

      if (!response.ok) {
        throw new Error("testPost() response is not ok");
      }

      const data = await response.json();

      console.log("testPost: data = ", data);

      setStatus("success");
    } catch (error: any) {
      console.warn("testPost: error = ", error);

      setStatus("error");
    }
  }

  async function testDynamicRouteGET(shouldError: boolean) {
    /*
    1. pass name & searchParams
    1. see output
    */

    setStatus("pending");

    try {
      const response = await fetch(
        `/250327-twitter-ui/play1-nextjs-api-routes/api/test-0/pikachu?query=queryTest1_GET&shouldError=${shouldError}`
      );

      if (!response.ok) {
        throw new Error("testDynamicRouteGET() response is not ok");
      }

      const data = await response.json();

      console.log("testDynamicRouteGET(): data = ", data);

      setStatus("success");
    } catch (error: any) {
      console.warn("testDynamicRouteGET: error = ", error.message);

      setStatus("error");
    }
  }

  async function testDynamicRoutePATCH(shouldError: boolean) {
    setStatus("pending");

    const mockPayload = {
      name: "Minun",
    };

    try {
      const response = await fetch(
        `/250327-twitter-ui/play1-nextjs-api-routes/api/test-0/pikachu?query=queryTest2_PATCH&shouldError=${shouldError}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockPayload),
        }
      );

      if (!response.ok) {
        throw new Error("testDynamicRoutePATCH(): response is not ok");
      }

      const data = await response.json();

      console.log("testDynamicRoutePATCH(): data = ", data);

      setStatus("success");
    } catch (error: any) {
      console.warn("testDynamicRoutePATCH(): error = ", error);

      setStatus("error");
    }
  }

  return (
    <section>
      <p>TestApiRoutes0</p>

      <aside>{status}</aside>

      <RoundButton color="gray600" handleClick={testGet}>
        Test GET
      </RoundButton>
      <br />

      <RoundButton color="green500" handleClick={() => testPost(false)}>
        Test POST: Success
      </RoundButton>
      <RoundButton color="pink600" handleClick={() => testPost(true)}>
        Test POST: Error
      </RoundButton>
      <br />

      <hr></hr>

      <RoundButton
        color="green600"
        handleClick={() => testDynamicRouteGET(false)}
      >
        Test GET: Dynamic Route: Success
      </RoundButton>
      <RoundButton
        color="pink600"
        handleClick={() => testDynamicRouteGET(true)}
      >
        Test GET: Dynamic Route: Error
      </RoundButton>
      <br />

      <hr></hr>

      <RoundButton
        color="green600"
        handleClick={() => testDynamicRoutePATCH(false)}
      >
        Test PATCH: Dynamic Route: Success
      </RoundButton>
      <RoundButton
        color="pink600"
        handleClick={() => testDynamicRoutePATCH(true)}
      >
        Test PATCH: Dynamic Route: Error
      </RoundButton>
      <br />
    </section>
  );
}

export default function Play1NextJSApiRoutes(): React.JSX.Element {
  return (
    <section className="bg-black h-screen text-white w-full">
      <p>Play1: NextJS Api Routes</p>
      <TestApiRoutes0 />
    </section>
  );
}
