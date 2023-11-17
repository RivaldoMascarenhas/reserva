import { valuesProps } from "@/@types/types";
import { prisma } from "@/lib/prima";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: valuesProps = await req.json();

  if (!data.name || !data.email || !data.password) {
    return NextResponse.json("Invalid parameters", { status: 400 });
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (isUserExists) {
    return NextResponse.json("User already exists", { status: 400 });
  }

  const password = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company,
      password,
      agree: data.agree,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
