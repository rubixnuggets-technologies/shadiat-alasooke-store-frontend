import ImageComponent from "@/src/components/image/ImageComponent";
import Icon from "@/src/components/ui/icons";

const CHOOSE_REASONS = [
  {
    title: "Custom Designs",
    description: "Tailored to your unique vision",
    icon: "customize_design",
  },
  {
    title: "Ready-to-Wear Collections",
    description: "Stylish options for immediate purchase",
    icon: "rtw_collections",
  },
  {
    title: "Quality Craftsmanship",
    description: "Handwoven by skilled artisans",
    icon: "quality_craftmanship",
  },
  {
    title: "Cultural Heritage",
    description: "Blending tradition with modern elegance",
    icon: "cultural_heritage",
  },
];

const RECOGNITIONS = [
  {
    title: "2X",
    description: "Best Traditional Bridal Wear Designer",
    icon: "award1",
  },
  {
    title: "3X",
    description: "Outstanding Craftsmanship Award",
    icon: "award2",
  },
  {
    title: "4X",
    description: "Innovative Design in Cultural Fashion",
    icon: "award3",
  },
];

export default function Page() {
  return (
    <div>
      <div className="mb-16">
        <div className="flex justify-center my-12">
          <h1 className="text-center max-w-[442px] text-brown-1200 text-[30px] lg:text-[40px]">
            Crafting Tradition with Modern Elegance
          </h1>
        </div>

        <div className="relative h-[200px] lg:h-[684px] w-full">
          <ImageComponent
            objectFit="cover"
            public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
            title="About Cover"
            className="object-top"
          />
        </div>
      </div>

      <div className="layout">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16">
          <div>
            <div className="relative h-[231px] lg:h-[311px] w-full">
              <ImageComponent
                objectFit="cover"
                public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                title="About Cover"
                className="object-top"
              />
            </div>

            <div className="mt-4 lg:mt-8">
              <h1 className="text-xl lg:text-2xl text-brown-1200">
                Welcome to Shadiat Alasooke Fashion Brand
              </h1>

              <p className="mt-2 lg:mt-4 text-[11px] text-brown-dark-1500 lg:text-base">
                In a world rich with culture and heritage, showcasing the beauty
                and tradition of one's attire is an intentional fashion
                statement. At Shadiat Alasooke, we blend traditional Aso Oke
                fabric with elegant modern-day materials to create bespoke
                outfits for your noble ceremonies.
              </p>
            </div>
          </div>

          <div>
            <div className="relative h-[231px] lg:h-[311px] w-full">
              <ImageComponent
                objectFit="cover"
                public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                title="About Cover"
                className="object-top"
              />
            </div>

            <div className="mt-4 lg:mt-8">
              <h1 className="text-xl lg:text-2xl">Quality and Craftsmanship</h1>

              <p className="mt-2 lg:mt-4 text-brown-dark-1500 text-[11px] lg:text-base">
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
          <div className="mt-9 lg:mt-36">
            <div className="w-full lg:w-[484px] m-auto">
              <h1 className="text-[24px] lg:text-2xl text-center text-brown-1200">
                Our Services
              </h1>

              <p className="mt-4 text-center text-brown-dark-1500 text-base">
                With deep roots in Yoruba culture and a flair for contemporary
                fashion, we cater to various generations and their unique
                styles. Our services include custom Bride & Groom outfits, Aso
                Ebi supply for both small and large gatherings, Ready-to-Wear
                (RTW) collections, and bespoke designs tailored to your creative
                vision.
              </p>
            </div>

            <ul className="grid gap-2 lg:gap-4 grid-cols-3 mt-12">
              <li className="relative h-[125px] lg:h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                  className="object-top"
                />
              </li>

              <li className="relative h-[125px] lg:h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                  className="object-top"
                />
              </li>

              <li className="relative h-[125px] lg:h-[268px] w-full">
                <ImageComponent
                  objectFit="cover"
                  public_id="v1723580102/alasooke-project/hero-images/eclnyji7rlvon5asahrv.png"
                  title="About Cover"
                  className="object-top"
                />
              </li>
            </ul>
          </div>

          <div className="mt-9 lg:mt-36">
            <h1 className="text-2xl">Why Choose Us?</h1>

            <p className="text-[11px] lg:text-base mt-4">
              Our commitment to quality and meticulous craftsmanship has set us
              apart in the industry, celebrating the artistry and cultural
              significance of each piece we create.
            </p>

            <ul className="grid grid-cols-9 gap-8 mt-11">
              {CHOOSE_REASONS.map(({ icon, title, description }, index) => (
                <li key={index} className="">
                  <div
                    key={index}
                    className="mt-4 border-l-2 h-full pl-8 border-brown-light-1000"
                  >
                    <div className="mb-3">
                      <Icon type={icon} />
                    </div>
                    <h1 className="text-base">{title}</h1>
                    <p className="mt-2">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 lg:mt-36">
            <h1 className="text-2xl">Recognition</h1>

            <p className="mt-2 lg:mt-4 text-[11px] lg:text-base">
              Shadiat Alasooke is honored to receive several prestigious awards,
              including:
            </p>

            <ul className="grid grid-cols-3 lg:grid-cols-9 gap-2 lg:gap-8 mt-3 lg:mt-11">
              {RECOGNITIONS.map(({ icon, title, description }, index) => (
                <li key={index}>
                  <div key={index} className="mt-0 lg:mt-4 h-full pl-8 flex flex-row">
                    <div className="mb-3">
                      <Icon type={icon} />
                    </div>

                    <div className="flex flex-col ml-1 lg:ml-2 justify-center pl-1">
                      <h1 className="text-base lg:text-3xl font-semibold">{title}</h1>
                      <p className="mt-1 lg:mt-2 text-[11px] lg:text-base">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
