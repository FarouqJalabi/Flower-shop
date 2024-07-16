import { PrismaClient } from "@prisma/client";

export async function POST(req:Request) {
  const body = await req.json()
 
  const {userId, flowerId, users} = body
  console.log(body, "Body")

  const prisma = new PrismaClient();

  const res = await prisma.user.update({where:{id:userId},
    data:{
      flowersLiked:{
        connect:{id:flowerId}
      }
  }})
  console.log(res)
 
  return new Response("OK")
}