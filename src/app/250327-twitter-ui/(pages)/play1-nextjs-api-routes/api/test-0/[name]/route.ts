import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  // Source - Dynamic Routes: https://nextjs.org/blog/building-apis-with-nextjs#3-creating-an-api-with-route-handlers
  const name = (await params).name;

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const shouldError = searchParams.get("shouldError");

  // TODO: testing
  console.log("searchParams = ", searchParams);

  if (shouldError === "true") {
    const body = JSON.stringify({
      result: `ERROR GET: with name = ${name} & query = ${query}`,
    });
    const options = {
      status: 400,
      headers: { "Content-Type": "application/json" },
    };

    return new Response(body, options);
  }

  // TODO: testing
  console.log("GET: query = ", query);
  console.log(
    "GET: shouldError = ",
    shouldError,
    " & typeof = ",
    typeof shouldError
  );

  const body = JSON.stringify({
    result: `GET: ${name} - You searched for: ${query}`,
  });
  const options = {
    status: 200,
    headers: { "Content-Type": "application/json" },
  };

  return new Response(body, options);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await params).name;

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const shouldError = searchParams.get("shouldError");
  try {
    if (shouldError === "true") {
      throw new Error(
        "mock error in PATCH /play1-nextjs-api-routes/api/test-0/[name]"
      );
    }

    const body = {
      result: `PATCH: ${name} - You searched for: ${query}`,
    };
    const options = {
      status: 200,
      headers: { "Content-Type": "application/json" },
    };

    // NOTE: compare `Response` vs. `NextResponse`
    // return new Response(JSON.stringify(body), options);
    return NextResponse.json(body, options);
  } catch (error: any) {
    const body = JSON.stringify({
      result: `ERROR PATCH: error with name = ${name} & query = ${query} - ${error.message}`,
    });
    const options = {
      status: 400,
      headers: { "Content-Type": "application.json" },
    };

    // NOTE: compare `Response` vs. `NextResponse`
    // return new Response(JSON.stringify(body), options);
    return NextResponse.json(body, options);
  }
}

/*
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify({ id, name: `User ${id}` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  // e.g. Delete user with ID `id` in DB
  return new Response(null, { status: 204 });
}
*/
