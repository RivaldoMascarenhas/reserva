import { prisma } from "@/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  const ambients = await prisma.ambients.findMany({
    include: { Schedules: true },
  });

  return Response.json({ ambients });
}
export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data);
  await prisma.ambients.create({
    data,
  });

  return Response.json({}, { status: 201 });
}
