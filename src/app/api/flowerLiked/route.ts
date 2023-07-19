import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();
  const { flowerId, flowerLiked } = body;
  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userId = JSON.parse(tokenValues).accessToken;

    const res = await prisma.user.update({
      where: { id: userId },
      data: {
        flowersLiked: flowerLiked
          ? { connect: { id: flowerId } }
          : { disconnect: { id: flowerId } },
      },
    });
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
