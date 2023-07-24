import Image from "next/image";
import LikeButton from "../likeButton";
import Link from "next/link";
export default function Flower(Info: FlowerInfo) {
  const onSale = Number(Info.salePrice) < 0.5;
  return (
    <div className="text-center">
      <Link href={`/flower/${Info.id}`}>
        <div className="relative w-52 sm:w-72 sm:h-40 bg-gray-300 overflow-hidden rounded-xl">
          <Image
            src={
              "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
              Info.id +
              ".jpg"
            }
            alt={Info.alt}
            width={288}
            height={160}
            className="object-cover "
          />
        </div>
      </Link>
      <div
        className={`absolute bg-red-600 text-white px-3 mt-[-2rem] leading-5 ${
          onSale ? "hidden" : ""
        }  `}
      >
        SALE
      </div>
      <div className="flex px-2 mt-2">
        <Link href={`/flower/${Info.id}`}>
          <div className="text-left">
            <h1 className="font-jua text-xl">{Info.title}</h1>
            <div className="flex flex-wrap gap-2">
              <p
                className={`${onSale ? "" : "line-through"}`}
              >{`${Info.price}$`}</p>
              <p className={`text-red-600`}>
                {/* Reality we checked for it already on sale so ? is kinda unnacecery */}
                {onSale ? "" : Info.salePrice + "$"}
              </p>
            </div>
          </div>
        </Link>

        <LikeButton id={Info.id} user={Info.users} />
      </div>
    </div>
  );
}
