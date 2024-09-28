import ImageComponent from "@/src/components/image/ImageComponent";

export default function Page() {
  return (
    <div>
      <div className="my-8">
        <p className="text-center text-2xl">
          {" "}
          Crafting Tradition with Modern Elegance{" "}
        </p>
      </div>

      <div>
        <div className="relative h-[684px] w-full mb-28">
          <ImageComponent
            objectFit="cover"
            public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
            title="About Cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-16 layout">
          <div>
            <div className="relative h-[311px] w-full">
              <ImageComponent
                objectFit="cover"
                public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                title="About Cover"
              />
            </div>

            <div className="mt-8">
              <p className="text-2xl">
                Welcome to Shadiat Alasooke Fashion Brand
              </p>

              <p className="mt-4">
                In a world rich with culture and heritage, showcasing the beauty
                and tradition of one's attire is an intentional fashion
                statement. At Shadiat Alasooke, we blend traditional Aso Oke
                fabric with elegant modern-day materials to create bespoke
                outfits for your noble ceremonies.
              </p>
            </div>
          </div>

          <div>
            <div className="relative h-[311px] w-full">
              <ImageComponent
                objectFit="cover"
                public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                title="About Cover"
              />
            </div>

            <div className="mt-8">
              <p className="text-2xl">Quality and Craftsmanship</p>

              <p className="mt-4">
                At Shadiat Alasooke, we pride ourselves on our unwavering
                commitment to quality and craftsmanship. Each piece of our Aso
                Oke is meticulously handwoven by skilled artisans, ensuring the
                highest standards of excellence. Our dedication to preserving
                traditional techniques while incorporating modern designs
                results in stunning, unique pieces that exude elegance and
                cultural heritage.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[850px] m-auto">
          <div className="mt-36">
            <div className="w-[484px] m-auto">
              <p className="text-2xl text-center">Our Services</p>

              <p className="mt-4 text-center ">
                With deep roots in Yoruba culture and a flair for contemporary
                fashion, we cater to various generations and their unique
                styles. Our services include custom Bride & Groom outfits, Aso
                Ebi supply for both small and large gatherings, Ready-to-Wear
                (RTW) collections, and bespoke designs tailored to your creative
                vision.
              </p>
            </div>

            <ul className="grid gap-4 grid-cols-3 mt-12">
              <li className="relative h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                />
              </li>

              <li className="relative h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                />
              </li>

              <li className="relative h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                />
              </li>
            </ul>
          </div>

          <div className="mt-36">
            <p className="text-2xl">Why Choose Us?</p>

            <p className="mt-4">
              Our commitment to quality and meticulous craftsmanship has set us
              apart in the industry, celebrating the artistry and cultural
              significance of each piece we create.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
