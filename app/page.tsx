import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import { SanityClient } from "@/utils/Sanity/client";
import { HERO_SECTION_QUERY } from "@/utils/Sanity/gqols";

const getPageData = async () => {
  const hero = await SanityClient().fetch(HERO_SECTION_QUERY);

  return {
    hero,
  };
};

export default async function Home() {
  const { hero } = await getPageData();

  return (
    <div>
      <Header />
      <Hero data={hero} />

      <div></div>
    </div>
  );
}
