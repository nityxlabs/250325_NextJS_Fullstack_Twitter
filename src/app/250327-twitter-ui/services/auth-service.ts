export async function authGetMe() {
  // SignUp API: NodeJS Route
  const apiRouteAuthMe = "/nodejs/api/auth/me";
  // SignUp API: NextJS Rote
  // const apiRouteAuthMe = "/250327-twitter-ui/me/api";

  try {
    const response = await fetch(apiRouteAuthMe);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
      // return null;
    }

    // TODO: testing
    // console.log("authUser is here:", data);

    return data;
  } catch (error: any) {
    console.error(error);
  }
}
