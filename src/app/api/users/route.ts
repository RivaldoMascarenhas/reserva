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

    const data = await userSchema.validate(await req.json());
    if (!data) {
      return NextResponse.json(
        {
          message: "Preencha todos os campos",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (existingUser && existingUser.password === null) {
      try {
        await prisma.user.update({
          where: { email: data.email },
          data: {
            agree: data.agree,
            company: data.company,
            password: hashedPassword,
          },
        });
      } catch (error) {
        return NextResponse.json("Falha na criação de usuário!", {
          status: 400,
        });
      }
      return NextResponse.json("Criado com Sucesso", {
        status: 201,
      });
    }

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
