import Image from "next/image";
import { FlowerInfo } from "."; // from index
import LikeButton from "../likeButton";
import { useSession } from "next-auth/react";

export default function Flower(Info: FlowerInfo) {
  const { data: session } = useSession();
  console.log(session?.user);
  console.log(session);
  // console.log("Run flower")
  const onSale = Info.salePrice == null;
  return (
    <div className="text-center">
      <div className="relative w-72 h-40 bg-red-600 overflow-hidden  rounded-xl">
        <Image
          src="/test.jpg"
          alt={"Yellow flower"}
          fill
          // We don't know the breakpoints yet
          sizes="25vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={`absolute bg-red-600 text-white px-3 mt-[-2rem] leading-5 ${
          onSale ? "hidden" : ""
        }  `}
      >
        SALE
      </div>
      <div className="flex px-2">
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
          {/* <p>{Info.id.toString()}</p> */}
        </div>

        <LikeButton id={Info.id} />
      </div>
    </div>
  );
}
