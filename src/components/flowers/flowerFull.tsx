import Image from "next/image";
import LikeButton from "../likeButton";
import Link from "next/link";
import ShoppingButton from "../shoppingButton";

//Just like flower expect it has shop button too
export default function FlowerFull(Info: FlowerInfo) {
  const onSale = Number(Info.salePrice) < 0.5;
  return (
    <div className="flex flex-col sm:flex-row max-w-2xl">
      <Link
        href={`/flower/${Info.id}`}
        className="mx-auto relative w-full sm:w-80 h-40  bg-gray-300 overflow-hidden rounded-xl"
      >
        <Image
          src={
            "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
            Info.id +
            ".jpg"
          }
          alt={Info.alt}
          // width={288}
          // height={160}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover "
        />
        <div
          className={`absolute bg-red-600 text-white px-3 bottom-2  leading-5 ${
            onSale ? "hidden" : ""
          }  `}
        >
          SALE
        </div>
      </Link>

      <div className="flex flex-col px-2 mt-2 w-full">
        <Link href={`/flower/${Info.id}`}>
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
        </Link>
        <p className="overflow-2-liner">{Info.description}</p>
        <div className="flex gap-2 w-full mt-auto">
          <ShoppingButton flower={Info} user={Info.shoppingList} small={true} />
          <LikeButton flower={Info} user={Info.users} />
        </div>
      </div>
    </div>
  );
}
