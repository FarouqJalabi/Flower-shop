import Image from "next/image";

export default function Employe() {
  return (
    <div className="flex gap-5 ">
      <div className="relative w-full h-96 bg-red-600 mx-auto flex-1">
        <Image
          src="/Employe_1.jpg"
          alt={"Picuter of mock employe robert long"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Gustav Long</h1>
        <h1 className="text-2xl font-bold">Ceo</h1>
        <p>Flowers bring happines to people, that&apos;s why I love my job!</p>
      </div>
    </div>
  );
}
