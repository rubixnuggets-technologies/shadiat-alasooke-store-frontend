"use client";
import { useRef, useState } from "react";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import { Hero as IHero } from "@/utils/types/schema";
import cn from "classnames";
import Image from "next/image";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    draggable: false,
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
              <div>
                <div
                  key={idx}
                  style={{}}
                  className={cn(
                    `bg-[#F0F0F0]`,
                    "h-[684px] grid grid-cols-[684px_auto]"
                  )}
                >
                  <div className="max-w-[330px] m-auto">
                    <div>
                      <div className="mb-4 h-[54px] bg-brown-100 max-w-[420px] flex items-center justify-center rounded-full">
                        <p className="text-normal">{cta_text} </p>
                      </div>

                      <div className="mb-12">
                        <h1 className="text-[40px]"> {title} </h1>
                      </div>

                      <button className="text-white bg-brown-200 h-[50px] w-[205px] border-brown-100 border-1">
                        {" "}
                        Shop Now{" "}
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-full">
                    <div className="relative h-full w-full">
                      <Image
                        alt={cta_text}
                        fill
                        loader={ImageLoader}
                        className="absolute object-cover"
                        src={cover.public_id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </Slider>

      <div>
        <ul className="mt-14 flex flex-row justify-center gap-3">
          {data &&
            data.map((_, idx) => (
              <li key={idx}>
                <div
                  onClick={() => sliderRef.slickGoTo(idx)}
                  className={cn(
                    "h-[13px] rounded-full hover:cursor-pointer",
                    activeItem === idx
                      ? "w-[43px] bg-brown-200"
                      : "w-[14px] bg-brown-100"
                  )}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
