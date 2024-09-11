"use client";
import { useRef, useState } from "react";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import { Hero as IHero } from "@/utils/types/schema";
import cn from "classnames";
import Image from "next/image";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../ui/button";
import DotsIndicator from "../ui/DotsIndicator";

// TODO: slider takes more space causing a horizontal scroll
const Hero = ({ data }: { data: IHero[] }) => {
  const [activeItem, setActiveItem] = useState(0);
  let sliderRef = useRef(null);

  const SliderSettings: Settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 6500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    draggable: true,
    rtl: true,
    afterChange: (slideNumber: number) => setActiveItem(slideNumber),
  };

  return (
    <div className="h-full w-full">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...SliderSettings}
      >
        {data &&
          data.map(
            (
              { title, background_color, button_link, cover, cta_text },
              idx
            ) => (
              <div key={idx}>
               <div
                  className={cn(
                    `bg-brown-200`,
                    "h-[1084px] grid grid-cols-[684px_auto]"
                  )}
                >
                  <div className="max-w-[330px] m-auto">
                    <div>
                      <div className="mb-4 h-[54px] bg-brown-500 max-w-[420px] flex items-center justify-center rounded-full">
                        <p className="text-normal">{cta_text} </p>
                      </div>

                      <div className="mb-12">
                        <h1 className="text-[40px]"> {title} </h1>
                      </div>

                      <Button title="Shop Now" />
                    </div>
                  </div>

                  <div className="w-full h-full">
                    <div className="relative h-full w-full">
                      <Image
                        alt={cta_text}
                        fill
                        loader={ImageLoader}
                        className="absolute object-cover object-top"
                        src={cover.public_id}
                      />
                    </div>
                  </div>
                </div> 
              </div>
            )
          )}
      </Slider>

      {data?.length >= 2 && (
        <DotsIndicator
          data={data}
          activeItem={activeItem}
          clickAction={(newSlide) => sliderRef.slickGoTo(newSlide)}
        />
      )}
    </div>
  );
};

export default Hero;
