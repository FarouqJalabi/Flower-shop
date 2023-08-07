import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  let { formData, flowersData } = body;
  if (!formData || !flowersData) {
    return NextResponse.json({}, { status: 400, statusText: "Missing data" });
  }

  flowersData = flowersData.filter((flower: any) => {
    flower.price = Number(flower.price);
    flower.salePrice = Number(flower.salePrice);
    delete flower.img;
    return true;
  });
  delete formData.img;

  try {
    const flowerPreview_res = await prisma.flowerPreviews.create({
      data: {
        ...formData,
        flowers: {
          create: [...flowersData],
        },
      },
      include: {
        flowers: { select: { id: true } }, // Include all flowers in the returned object
      },
    });

    const flower_id = flowerPreview_res.flowers.map((flower) => {
      return flower.id;
    });

    return new Response(
      JSON.stringify({
        flowersId: flower_id,
        previewId: flowerPreview_res.id,
      })
    );
  } catch (error) {
    console.log(error, "ERROR");
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        statusText: "Some title already exist",
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  let { previews } = body;

  if (!previews) {
    return NextResponse.json({}, { status: 400, statusText: "Missing data" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      for (let i in previews) {
        const order = previews.length - Number(i);
        await tx.flowerPreviews.update({
          where: { id: previews[i].id },
          data: { order: order },
        });
      }
    });
    return NextResponse.json(
      {},
      { status: 200, statusText: "Updated order succefuly" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        statusText: "Failed to update flowerPreview",
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  const previewId = req.nextUrl.searchParams.get("id");
  console.log(req.url, "DELETE req");

  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }

  const tokenValues = JSON.stringify(token, null, 2);
  const userEmail = JSON.parse(tokenValues)?.user?.email;

  if (userEmail !== "admin@hotmail.com") {
    return NextResponse.json({}, { status: 403 });
  }

  if (!previewId) {
    return NextResponse.json({}, { status: 400, statusText: "Missing data" });
  }

  try {
    const flowerPreview_res = await prisma.flowerPreviews.delete({
      where: { id: previewId },
    });

    return NextResponse.json(
      { ...flowerPreview_res },
      { status: 200, statusText: "Deleted succefully" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        statusText: "Failed to delete flowerPreview",
      }
    );
  }
}
