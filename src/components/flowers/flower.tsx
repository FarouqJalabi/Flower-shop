import Image from "next/image";
import LikeButton from "../likeButton";
import Link from "next/link";

interface props {
  Info: FlowerInfo;
  scrollIndex: number;
}
export default function Flower({ Info, scrollIndex }: props) {
  const onSale = Number(Info.salePrice) < 0.5;
  return (
    <div className="text-center max-w-min scroll-m-5 relative">
      <div
        className="absolute scrollTo top-1/2 -translate-x-1/2 w-1 h-1 "
        data-scroll-index={scrollIndex}
      ></div>
      <Link
        href={`/flower/${Info.id}`}
        className="object-cover relative w-52 h-28 sm:w-72 sm:h-40 bg-red-700 "
      >
        <div className="object-cover relative w-52 h-28 sm:w-72 sm:h-40 bg-gray-300 rounded-xl overflow-hidden">
          <Image
            src={
              "https://eljnfbtxmeteozramfkt.supabase.co/storage/v1/object/public/flower_images/" +
              Info.id +
              ".jpg"
            }
            alt={Info.alt}
            // width={288}
            // height={160}
            sizes="@media (min-width: 640px) 18rem, 13rem"
            fill
            className="object-cover"
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

        <LikeButton flower={Info} user={Info.users} />
      </div>
    </div>
  );
}
