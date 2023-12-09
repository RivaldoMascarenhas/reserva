import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { date, object, string } from "yup";

export async function POST(req: NextRequest) {
  try {
    const eventSchema = object({
      title: string().required("Titulo do evento é obrigatória").lowercase(),
      equipment: string(),
      description: string(),
      dateEvent: date().required("Data do evento é obrigatória"),
      dateMinutesStart: date().required(
        "Horário inicial do evento é obrigatória"
      ),
      dateMinutesEnd: date().required("Horário final do evento é obrigatória"),
    });

    const event = await eventSchema.validate(await req.json(), {
      abortEarly: false,
    });

    const existEvent = await prisma.schedules.findFirst({
      where: {
        title: event.title,
      },
    });

    if (existEvent) {
      return NextResponse.json("Ambiente já existe!", {
        status: 400,
      });
    }

    await prisma.ambients.create({
      data: event,
    });
    return Response.json({}, { status: 201 });
  } catch (error: any) {
    console.log("Erro durante a criação do Evento:", error.errors);
    return NextResponse.json(
      {
        message: "Erro durante a criação do Evento",
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
