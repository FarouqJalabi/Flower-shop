import { PrismaClient } from "@prisma/client";

export async function POST(req:Request) {
  // Handle case already have account
  const body = await req.json()
 
  console.log(body, "Body")
  const prisma = new PrismaClient();
  const res = await prisma.user.create({data:body})

  return new Response("OK")
}