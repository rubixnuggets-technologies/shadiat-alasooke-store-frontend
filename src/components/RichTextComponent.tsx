import {
  PortableText,
  PortableTextComponents,
  toPlainText,
} from "@portabletext/react";
import React from "react";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
// import { truncateText } from "./helpers"
// import { ImageLoader } from "./Cloudinary"
// import CloudinaryAssetRenderer from "@/components/Cloudinary/AssetRender"
// import ReactPlayer from "react-player"
// import { Anchor, H2Heading, H3Heading, H4Heading, Text, ULList } from "@/styles"
import { truncateText } from "@/utils/helpers/text";
import cn from "classnames";

interface RichTextComponentProps {
  richText: any;
  isClamped?: boolean;
  maxTextLength?: number;
  textClassname?: string;
}

interface RichTextOpts extends Omit<RichTextComponentProps, "richText"> {
  listLength?: number;
}

const RichTextComponent = ({
  richText,
  isClamped,
  maxTextLength,
  textClassname,
}: RichTextComponentProps) => {
  let temp = "";

  const richTextParagraphs = React.useMemo(() => {
    if (Array.isArray(richText)) {
      const blocks = richText!.filter(
        // @ts-ignore
        (item) => item.style === "normal"
      );

      return blocks.length;
    }
  }, [richText]);

  const RichTextConfiguration = ({
    listLength,
    isClamped,
    maxTextLength,
  }: RichTextOpts): PortableTextComponents => ({
    types: {
      "cloudinary.asset": ({ value }) => (
        <CloudinaryAssetRenderer value={value} />
      ),
      image: ({ value }) => {
        return (
          <div>
            <Image loader={ImageLoader} alt="" src={value} />
          </div>
        );
      },
      // youtube: ({ value }) => {
      //   return (
      //     <div style={{ margin: "20px 0" }}>
      //       <ReactPlayer width="100%" height="700px" url={value?.url} />
      //     </div>
      //   )
      // },
    },
    marks: {
      link: ({ children, value }) => {
        return <a href={value.href}> {children} </a>;
      },
      b: ({ children }) => {
        return (
          <b>{children}</b>
        )
      },
      bold: ({ children }) => {
        return (
          <b>{children}</b>
        )
      },
    },
    block: {
      h2: ({ children }) => {
        return <p>{children}</p>;
      },
      b: ({ children }) => (
        <b>{children}</b>
      ),
      h3: ({ children }) => {
        return <p>{children}</p>;
      },
      h4: ({ children }) => {
        return <p>{children}</p>;
      },
      normal: ({ children, value, index }) => {
        if (maxTextLength && richTextParagraphs) {
          temp += toPlainText(value);

          if (index + 1 < richTextParagraphs) {
            return <p> </p>;
          }

          return <p> {truncateText(temp, maxTextLength)} </p>;
        }

        return (
          <p className={cn(textClassname ? textClassname : "text-base")}>
            {children}
          </p>
        );
      },
    },
    list: {
      bullet: ({ children }) => {
        return <ul>{children?.slice(0, isClamped ? listLength : 1000)}</ul>;
      },
    },
    listItem: ({ children }) => {
      return (
        <ul>
          <p> {children} </p>
        </ul>
      );
    },
  });

  return (
    <PortableText
      value={richText}
      components={RichTextConfiguration({
        listLength: 2,
        isClamped,
        maxTextLength,
      })}
    />
  );
};

export default RichTextComponent;
