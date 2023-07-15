import Image from "next/image";
import { FlowerInfo } from "."; // from index
import LikeButton from "../likeButton";

export default function Flower(Info: FlowerInfo) {
  // console.log("Run flower")
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
      <div className="flex px-2">
        <div className="text-left">
          <h1 className="font-jua text-xl">{Info.name}</h1>
          <p>{Info.price.toString()}$</p>
          <p>{Info.id.toString()}</p>
        </div>

        <LikeButton id={Info.id.toString()} />
      </div>
    </div>
  );
}
