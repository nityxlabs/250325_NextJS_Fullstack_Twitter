import { useQuery } from "@tanstack/react-query";

async function authGetMe() {
  // SignUp API: NodeJS Route
  const apiRouteAuthMe = "/nodejs/api/auth/me";
  // SignUp API: NextJS Rote
  // const apiRouteAuthMe = "/250327-twitter-ui/me/api";
  const response = await fetch(apiRouteAuthMe);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
    // return null;
  }

  // TODO: testing
  // console.log("authUser is here:", data);

  return data;
}

export default function useAuthGetMe() {
  // get user authenticate data
  const {
    data: authenticatedUser,
    isError: authenticatedUserIsError,
    isLoading: authenticatedUserIsLoading,
    error: authenticatedUserError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: authGetMe,
  });

  return {
    authenticatedUser,
    authenticatedUserIsError,
    authenticatedUserIsLoading,
    authenticatedUserError,
  };
}
