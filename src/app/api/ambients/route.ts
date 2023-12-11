import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { object, string } from "yup";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get("q");
    if (search?.length) {
      const results = await prisma.ambients.findFirst({
        where: {
          title: search,
        },
      });
      return NextResponse.json({ results }, { status: 200 });
    }

    const ambients = await prisma.ambients.findMany({
      include: { Schedules: true },
    });

    if (ambients.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(ambients, { status: 200 });
  } catch (error) {
    console.error("Erro durante a requisição:", error);
    return NextResponse.json(
      { error: "Erro durante a requisição" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ambientSchema = object({
      title: string().required("title é obrigatório.").lowercase(),
    });
    const ambient = await ambientSchema.validate(await req.json());

    const existAmbient = await prisma.ambients.findUnique({
      where: {
        title: ambient.title,
      },
    });
    if (existAmbient) {
      return NextResponse.json("Ambiente já existe!", {
        status: 400,
      });
    }

    const newAmbient = await prisma.ambients.create({
      data: ambient,
    });
    return Response.json({ ...newAmbient }, { status: 201 });
  } catch (error: any) {
    console.log("Erro durante a criação do Ambiente:", error.errors);
    return NextResponse.json(
      {
        message: "Erro durante a criação do Ambiente",
        error: {
          path: error.inner.map((err: any) => err.path),
          message: error.inner.map((err: any) => err.message),
        },
      },
      {
        status: 500,
      }
    );
  }
}
