import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain");

  const apiKey = process.env.API_KEY;
  const url = `https://apis.dappradar.com/v2/dapps?chain=${chain?.toLowerCase()}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed on the request" },
      { status: 500 }
    );
  }
}
