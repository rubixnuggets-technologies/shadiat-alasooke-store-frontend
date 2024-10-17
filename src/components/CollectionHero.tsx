"use client"
import RichTextComponent from "@/src/components/RichTextComponent";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import { usePathname } from "next/navigation";

export default function CollectionHero({ data, slug } : {  data: any, slug: string }) {
//   const { slug } = params;
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center mb-14 lg:mb-28">
      <div className="mb-3">
        <Breadcrumb
          items={[
            { text: "Home", route: "/" },
            { text: slug.split("-").join(" "), route: pathname },
          ]}
        />
      </div>

      <h1 className="text-xl lg:text-[40px] text-brown-light-2100 mb-3.5"> {data?.title} </h1>

      <div className="max-w-[284px] lg:max-w-[396px]  m-auto text-center">
        <RichTextComponent
          textClassname="text-xs lg:text-sm text-brown-dark-1500"
          richText={data?.description}
        />
      </div>
    </div>
  );
}
