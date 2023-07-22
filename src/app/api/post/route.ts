import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/app/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userEmail = JSON.parse(tokenValues).user.email;

    if (userEmail === "admin@hotmail.com") {
      let { formData, flowersData } = body;
      if (formData) {
        flowersData = flowersData.filter((flower: any) => {
          flower.price = Number(flower.price);
          flower.salePrice = Number(flower.salePrice);
          delete flower.img;
          return true;
        });
        delete formData.img;

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
      }

      revalidatePath("/");
    }
  }
  return new Response("401");
}
