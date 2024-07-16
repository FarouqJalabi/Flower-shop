import { prisma } from "@/app/db";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page(props: any) {
  const Info = await prisma.flower.findFirst({
    where: { id: props.params.id },
    include: { tags: true },
  });
  if (!Info) {
    return redirect("/404");
  }
  return (
    <div className="flex sm:flex-row flex-col ">
      <Image
        src={
          "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
          Info.id +
          ".jpg"
        }
        alt={Info.alt}
        width={288}
        height={160}
        className="flex-1 max-sm:w-full object-cover"
        sizes="(min-width: 640px) 100vw, 40vw"
      />
      <div className="flex-1 px-2 flex flex-col">
        <h1 className="text-3xl">{Info.title}</h1>
        <h2 className="text-2xl">{Info.price}</h2>
        <p>{Info.description}</p>
        <div className="mt-auto">
          <button className="bg-black text-white font-jua text-3xl p-2 rounded-2xl w-full">
            Add to shopping cart
          </button>

          <div className="flex gap-2 my-2">
            {Info.tags.map((v) => {
              return <p className="bg-gray-300 p-2 rounded-xl ">{v.tag}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
