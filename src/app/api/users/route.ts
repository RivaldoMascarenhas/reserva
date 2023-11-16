import { valuesProps } from "@/@types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: valuesProps = await req.json();

  return NextResponse.json({ body: data }, { status: 200 });
}
