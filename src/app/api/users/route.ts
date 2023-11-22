import { valuesProps } from "@/@types/types";
import { prisma } from "@/lib/prima";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: valuesProps = await req.json();

    if (!data.name || !data.email || !data.password) {
      return NextResponse.json("Parâmetros inválidos", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json("Usuário já existe", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        password: hashedPassword,
        agree: data.agree,
      },
    });

    console.log(`Usuário criado: ${user.email}`);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Erro durante a criação do usuário:", error);
    return NextResponse.json("Erro durante a criação do usuário", {
      status: 500,
    });
  }
}
