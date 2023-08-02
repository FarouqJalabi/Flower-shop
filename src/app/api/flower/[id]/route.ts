import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await req.json();
  const { flower } = body;

  if (!flower) {
    return NextResponse.json(
      {},
      { status: 400, statusText: "flower data not provided" }
    );
  }
  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  flower.price = Number(flower.price);
  flower.salePrice = Number(flower.salePrice);
  delete flower.img;

  try {
    const flower_res = await prisma.flower.create({
      data: flower,
    });

    return NextResponse.json({ ...flower_res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        statusText: "Failed to update flower",
      }
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await req.json();
  const { listType, addToList } = body;

  const tokenValues = JSON.stringify(token, null, 2);
  const userId = JSON.parse(tokenValues).accessToken;

  if (typeof addToList !== "boolean") {
    return NextResponse.json(
      {},
      { status: 400, statusText: "Missing flower data" }
    );
  }

  if (!(listType === "like" || listType === "shoppingList")) {
    return NextResponse.json(
      {},
      { status: 400, statusText: "listType is not valid" }
    );
  }

  try {
    const flower_res = await prisma.flower.update({
      where: { id: params.id },
      data:
        listType == "like"
          ? {
              users: addToList
                ? { connect: { id: userId } }
                : { disconnect: { id: userId } },
            }
          : {
              shoppingList: addToList
                ? { connect: { id: userId } }
                : { disconnect: { id: userId } },
            },
    });

    return NextResponse.json({ ...flower_res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        statusText: "Failed to update flower",
      }
    );
  }
}

export async function DELETE(
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
    const flower_res = await prisma.flower.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { ...flower_res },
      { status: 200, statusText: "Deleted flower" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: "Failed to delete flower" }
    );
  }
}
