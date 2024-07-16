import { Prisma } from "@prisma/client";

import { prisma } from "@/app/db";

export async function POST(req: Request) {
  // Handle existing account

  // Handle login from here? leads to can't spam api

  const body = await req.json();

  try {
    await prisma.user.create({ data: body });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return new Response("401");
    } else {
      throw e;
    }
  }
  return new Response("OK");
}
