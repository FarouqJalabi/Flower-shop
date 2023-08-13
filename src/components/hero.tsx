import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="flex  overflow-clip">
        <div className="flex-1 m-12">
          <div className="mb-10">
            <div className="flex relative gap-4">
              <h1 className="font-bold text-3xl font-jua">
                Flowers for every person
              </h1>
              <div className="relative aspect-square h-14 mt-[-16px]  ">
                <Image
                  src={"/people.svg"}
                  alt={"Outline of a medal with a star in the middle."}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-2xl">
              With our collection of over 500+ flowers there is one flower that
              will fit you&apos;re need. With the help of our experts we can
              deliver then the whole year!
            </p>
          </div>
          <div>
            <div className="flex relative gap-2">
              <h1 className="font-bold text-3xl font-jua">Quality flowers</h1>
              <div className="relative aspect-square h-14 mt-[-16px]  ">
                <Image
                  src={"/medal.svg"}
                  alt={"Outline of a medal with a star in the middle."}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-2xl">
              Quality flowers, chosen and grown by our experts. Our packaging
              ensurers the flower stays intact.
            </p>
          </div>
        </div>
        <div className="relative scale-x-[-1] z-[-1] aspect-square mb-[-200px]  mr-[-200px] w-[650px] lg:block hidden">
          <Image
            src={"/bigFlower.png"}
            alt={"A pink flower"}
            fill
            sizes="30vw"
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>

      {/* Headers break before flex-1 */}
      <section className="flex flex-col md:flex-row bg-black text-white gap-10 p-4 py-9">
        <div>
          <div className="flex relative gap-2">
            <h1 className="text-3xl font-jua">Quality packaging</h1>
            <div className="relative aspect-square h-12 mt-[-16px]  ">
              <Image
                src={"/package.svg"}
                alt={"An outline of a white box"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <p className="text-xl">
            Our special made packages ensures the flowers stays alive world
            wide. We also offer gift ready packages.
          </p>
        </div>
        <div>
          <div className="flex relative gap-2">
            <h1 className="text-3xl font-jua">Happy customers</h1>
            <div className="relative aspect-square h-12 mt-[-16px]  ">
              <Image
                src={"/profileTick.svg"}
                alt={"An outline of a profile picture with a tic"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <p className="text-xl">
            The comments we receives shows we have the happiest customers ever.
            We are forever grateful for them.
          </p>
        </div>
        <div>
          <div className="flex relative gap-2">
            <h1 className="text-3xl font-jua">Fast delivery</h1>
            <div className="relative aspect-square h-12 mt-[-16px]  ">
              <Image
                src={"/fastTruck.svg"}
                alt={"An outline of a truck thta's speeding."}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <p className="text-xl">
            Our free delivery makes sure the flowers come to you. Our paid fast
            delivery makes sure it comes in time.
          </p>
        </div>
      </section>
    </>
  );
}
