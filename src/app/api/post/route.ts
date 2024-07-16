import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formData, flowerData } = body;
  console.log(formData, "formData");
  await prisma.flowerPreviews.create({
    data: { title: formData.title, underTitle: formData.underTitle },
  });
  revalidatePath("/");

  // console.log(flowerData, "flowerData");
  return new Response("OK");
}
