// Source - pass: https://nextjs.org/blog/building-apis-with-nextjs#3-creating-an-api-with-route-handlers
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line
export async function GET(request: NextRequest) {
  // TODO: testing
  // console.log("/play1-nextjs-api-routes/api/test-0 - request v0 = ", request);

  return NextResponse.json(
    {
      message: "GET: /play1-nextjs-api-routes/api/test-0",
      success: true,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("POST: body = ", body);

    if (body.shouldError) {
      throw new Error("mock error in POST /play1-nextjs-api-routes/api/test-0");
    }

    return NextResponse.json(
      {
        message: "POST: /play1-nextjs-api-routes/api/test-0",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST error = ", error.message);

    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
