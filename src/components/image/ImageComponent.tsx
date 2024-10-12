"use client";
import React from "react";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";

// const ImageContainer = styled.div<{ isFullScreen: boolean }>`
//   height: ${(props) => (props.isFullScreen ? "100%" : "550px")};
//   margin: 26px 0;
//   width: 100%;
//   position: relative;
//   &:hover {
//     cursor: ${(props) => (props.isFullScreen ? "zoom-out" : "zoom-in")};
//   }
// `;

interface ImageComponentProps {
  title: string;
  public_id: string;
  objectFit?: string;
  className?: string;
}

const ImageComponent = ({
  className,
  title,
  public_id,
  objectFit = "contain",
}: ImageComponentProps) => {
  return (
    <div>
      <Image
        fill
        style={{ position: "absolute", objectFit }}
        loader={ImageLoader}
        alt={title}
        className={className}
        src={public_id}
      />
    </div>
  );
};

export default ImageComponent;
