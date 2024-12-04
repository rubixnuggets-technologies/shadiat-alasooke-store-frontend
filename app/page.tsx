import React from "react";

import { SanityClient } from "@/utils/Sanity/client";
import { HOME_PAGE_QUERY } from "@/utils/Sanity/gqols";
import Wrapper from "./wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alasooke",
  description: "Store by Alasooke",
};

const getPageData = async () => {
  console.log("ENV VARS =>", process.env)

  const data = await SanityClient().fetch(HOME_PAGE_QUERY);

  return {
    data: data[0],
  };
};

export default async function Home() {
  const { data } = await getPageData();

  return (
    <div>
      <Wrapper
        hero={data?.hero}
        shopCTAs={data?.shop_ctas}
        testimonials={data?.testimonials}
      />
    </div>
  );
}
