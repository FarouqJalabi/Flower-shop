import { prisma } from "@/app/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  // Handle existing account

  // Handle login from here? leads to can't spam api

  const body = await req.json();
  console.log(body, "BODY");
  const a = await prisma.user.findUnique({
    where: { email: "admin@hotmail.com" },
  });
  console.log(a, "AA");
  try {
    await prisma.user.create({ data: body });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
