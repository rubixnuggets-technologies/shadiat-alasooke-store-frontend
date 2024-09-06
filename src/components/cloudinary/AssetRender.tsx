import React from "react";
import ImageComponent from "../image/ImageComponent";

const extractNameFromUrl = (url: string): string => {
  const slashes = url.split("/");

  return slashes[slashes.length - 1];
};

const CloudinaryAssetRenderer = ({ value }: any) => {
  switch (value.format) {
    case "mp3":
      return (
        <div style={{ margin: "20px 0" }}>
          <audio style={{ width: "100%" }} controls>
            <source src={value.secure_url} />
          </audio>

          <p>
            <i> {extractNameFromUrl(value.secure_url)} </i>
          </p>
        </div>
      );
    case "mov":
    case "mp4":
      return (
        <div style={{ margin: "20px 0" }}>
          <video controls width="100%">
            <source src={value.secure_url} type="video/webm" />
          </video>
        </div>
      );
    case "png":
    case "jpeg":
    case "jpg":
      return (
        <ImageComponent public_id={value?.public_id} title={value?.title} />
      );

    default:
      return <div />;
  }
};

export default CloudinaryAssetRenderer;
