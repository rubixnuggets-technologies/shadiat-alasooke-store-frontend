"use client";
import { useRef, useState } from "react";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import { Hero as IHero } from "@/utils/types/schema";
import cn from "classnames";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../ui/button";
import DotsIndicator from "../ui/DotsIndicator";
import {
  MOBILE_BREAKPOINT,
  useMediaQuery,
} from "@/utils/hooks/useStyleWidthQuery";

// TODO: slider takes more space causing a horizontal scroll
const Hero = ({ data }: { data: IHero[] }) => {
  const [activeItem, setActiveItem] = useState(0);
  let sliderRef = useRef(null);
  const isSmallScreen = useMediaQuery(MOBILE_BREAKPOINT);

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
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...SliderSettings}
      >
        {data &&
          data.map(
            ({ title, button_link, button_text, cover, cta_text }, idx) => {
              return (
                <div key={idx} className="right-0">
                  {cover?.resource_type === "video" && !isSmallScreen ? (
                    <div
                      className={cn(
                        `bg-brown-light-100 right-0`,
                        "h-[397px] lg:h-[calc(100vh-200px)] relative"
                      )}
                    >
                      <div className="max-w-[452px] z-10 m-auto py-9 lg:py-0 absolute bottom-10 left-10">
                        <div>
                          <div className="flex justify-center lg:justify-start">
                            <div className="mb-4 h-8 lg:h-[54px] bg-brown-light-500 w-fit px-5 lg:px-6 flex items-center justify-center rounded-full">
                              <p className="text-xs text-brown-light-2100 lg:text-sm">
                                {cta_text}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="mb-5 lg:mb-12">
                            <h1 className="text-center leading-8 lg:leading-[55px] lg:text-left text-2xl lg:text-[40px]">
                              {" "}
                              {title}{" "}
                            </h1>
                          </div>
                          
                          <div className="flex justify-center lg:justify-start">
                            <Link href={button_link || "#"}>
                              <Button title={button_text} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <video
                        autoPlay
                        controls={false}
                        controlsList=""
                        muted
                        loop
                        className="w-full h-full object-cover"
                      >
                        <source
                          className="w-full h-full"
                          src={cover?.secure_url}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        `bg-brown-light-100 right-0`,
                        "h-full lg:h-[calc(100vh-200px)] flex flex-col-reverse md:grid md:grid-cols-[684px_auto]"
                      )}
                    >
                      <div className="max-w-[330px] m-auto py-9 lg:py-0">
                        <div>
                          <div className="flex justify-center lg:justify-start">
                            <div className="mb-4 h-8 lg:h-[54px] bg-brown-light-500 w-fit px-5 lg:px-6 flex items-center justify-center rounded-full">
                              <p className="text-xs text-brown-light-2100 lg:text-sm">
                                {cta_text}{" "}
                              </p>
                            </div>
                          </div>

                          <div className="mb-5 lg:mb-12">
                            <h1 className="text-center leading-8 lg:leading-[55px] lg:text-left text-2xl lg:text-[40px]">
                              {" "}
                              {title}{" "}
                            </h1>
                          </div>

                          <div className="flex justify-center lg:justify-start">
                            <Link href={button_link || "#"}>
                              <Button title={button_text} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-[397px] lg:h-full">
                        {cover?.resource_type === "video" && isSmallScreen ? (
                          <video
                            autoPlay
                            controls={false}
                            controlsList=""
                            muted
                            className="w-full h-full object-cover"
                          >
                            <source
                              className="w-full h-full"
                              src={cover?.secure_url}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <div className="relative h-full lg:h-full w-full">
                            <Image
                              alt={cta_text}
                              fill
                              loader={ImageLoader}
                              className="absolute object-cover object-top"
                              src={cover.public_id}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
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
