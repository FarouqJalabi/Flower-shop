import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const { tag } = body;

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userId = JSON.parse(tokenValues);

    const res = await prisma.tags.create({ data: { tag: tag } });
    if (res) {
      return new Response("Ok");
    }
  }
  new Response("401");
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userId = JSON.parse(tokenValues).accessToken;

    const flowerLiked = await prisma.user.findFirst({
      where: { id: userId },
      select: { flowersLiked: { select: { id: true } } },
    });

    if (flowerLiked) {
      return new Response(JSON.stringify(flowerLiked));
    }
  }
  return new Response("401");
}
