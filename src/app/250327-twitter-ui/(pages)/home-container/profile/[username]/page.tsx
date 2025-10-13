// File inspiration - dynamic client-side routing: Webpack_React_Learn/250227_NextJS_Setup/nextjs-app/src/app/(main-project)/exp3-dynamic-routes-client/[testId]/page.tsx
"use client";

import { use } from "react";

import ProfilePage from "./profile-page-0";

export default function Profile({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<Record<string, any>>;
}): React.JSX.Element {
  const paramValues = use(params);
  const searchParamValues = use(searchParams);

  const { username } = paramValues;

  console.log("Profile: paramValues = ", paramValues);
  console.log("Profile: searchParamValues = ", searchParamValues);

  return <ProfilePage username={username} />;
}
