import { prisma } from "@/_lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { boolean, object, string } from "yup";

export async function POST(req: NextRequest) {
  try {
    const userSchema = object({
      company: string(),
      name: string().required(),
      email: string().required(),
      password: string().required(),
      agree: boolean(),
    });

    const data = await userSchema.validate(await req.json(), {
      abortEarly: false,
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
      return NextResponse.json(newUser);
    }

    if (existingUser && existingUser.password === null) {
      await prisma.user.update({
        where: { email: data.email },
        data: {
          agree: data.agree,
          company: data.company,
          password: hashedPassword,
        },
      });
      return NextResponse.json("Criado com Sucesso", {
        status: 201,
      });
    }
  } catch (error) {
    console.error("Erro durante a criação do usuário:", error);
    return NextResponse.json("Erro durante a criação do usuário", {
      status: 500,
    });
  }
}
