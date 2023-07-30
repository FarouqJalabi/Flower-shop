import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const { tag, deleteTag } = body;

  if (token) {
    const res = !deleteTag
      ? await prisma.tags.create({ data: { tag: tag } })
      : await prisma.tags.delete({ where: { tag: tag } });

    if (res) {
      return new Response("Ok");
    }
  }
  new Response("401");
}
