import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userEmail = JSON.parse(tokenValues).user.email;

    if (userEmail === "admin@hotmail.com") {
      let { flower, remove } = body;
      if (flower) {
        const flower_res = remove
          ? await prisma.flower.delete({
              where: {
                ...flower,
              },
            })
          : await prisma.flower.create({
              data: {
                ...flower,
              },
            });

        return NextResponse.json({ ...flower_res }, { status: 200 });
      }
    }
  }
  return new Response("401");
}
