import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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
