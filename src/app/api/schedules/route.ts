import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { date, object, string } from "yup";

export async function POST(req: NextRequest) {
  try {
    const schedulesSchema = object({
      title: string()
        .required("Titulo é obrigatório.")
        .min(3, { message: "Deve conter no mínino 3 caracteres" }),
      equipment: string(),
      description: string(),
      dateEvent: date().required("Data do evento é obrigatório."),
      dateMinutesStart: date().required("Horário inicial é obrigatório."),
      dateMinutesEnd: date().required("Horário final é obrigatório."),
      ambientsId: string().required("Id do ambiente é obrigatório."),
    });

    const schedule = await schedulesSchema.validate(await req.json(), {
      abortEarly: false,
    });

    await prisma.schedules.create({
      data: schedule,
    });

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
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
