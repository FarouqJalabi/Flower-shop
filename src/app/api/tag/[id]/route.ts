import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  try {
    const tag_res = await prisma.tags.create({ data: { tag: params.id } });
    // : await prisma.tags.delete({ where: { tag: params.id } });
    return NextResponse.json(
      { ...tag_res },
      { status: 200, statusText: "Success" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: "Tag already exists" }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  try {
    const tag_res = await prisma.tags.delete({ where: { tag: params.id } });
    return NextResponse.json(
      { ...tag_res },
      { status: 200, statusText: "Success" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: "Tag doesn't exists, please refresh" }
    );
  }
}
