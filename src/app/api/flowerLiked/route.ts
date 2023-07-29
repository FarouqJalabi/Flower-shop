import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  const { flowerId, flowerLiked } = body;

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userId = JSON.parse(tokenValues).accessToken;

    console.log(flowerLiked, "Flower liked");
    console.log(userId, "userId");
    console.log(flowerId, "flowerId");
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
