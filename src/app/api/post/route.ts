import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const body = await req.json();

  if (token) {
    const tokenValues = JSON.stringify(token, null, 2);
    const userEmail = JSON.parse(tokenValues).user.email;

    if (userEmail === "admin@hotmail.com") {
      let { formData, flowersData } = body;
      if (formData || flowersData) {
        console.log(formData, "formData");
        flowersData = flowersData.filter((flower: any) => {
          flower.price = Number(flower.price);
          flower.salePrice = Number(flower.salePrice);
          delete flower.img;
          return true;
        });
        console.log("filtered");
        const flowerPreview_res = await prisma.flowerPreviews.create({
          data: {
            title: formData.title,
            underTitle: formData.underTitle,
            flowers: {
              create: [...flowersData],
            },
          },
          include: {
            flowers: { select: { id: true } }, // Include all flowers in the returned object
          },
        });

        console.log("sent");
        const flower_id = flowerPreview_res.flowers.map((flower) => {
          return flower.id;
        });

        console.log("Should return");
        return new Response(JSON.stringify(flower_id));
      }

      revalidatePath("/");
    }
  }
  return new Response("401");
}
