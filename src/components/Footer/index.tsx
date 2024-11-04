import { ImageLoader } from "@/utils/helpers/Cloudinary";
import Image from "next/image";
import Link from "next/link";
import NewsletterSubscription from "./NewsletterSubscription";

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const Footer = () => {
  return (
    <footer className="bg-brown-dark-100 mt-8 py-8 lg:py-24">
      <div className="layout-container">
        <div className="layout">
          <NewsletterSubscription />

          <div className="mt-14 lg:mt-24">
            <ul className="flex flex-col lg:grid lg:grid-cols-6 gap-14 lg:gap-24 content-stretch">
              <li>
                <div className="max-w-32">
                  <Link href="/">
                    <div className="relative w-16 h-8 lg:w-[116px] lg:h-[56px]">
                      <Image
                        src={HERO_URL}
                        alt="Shadiat Alasooke"
                        loader={ImageLoader}
                        fill
                        className="absolute object-cover"
                      />
                    </div>
                  </Link>

                  <p className="text-brown-2100 text-sm lg:text-base mt-2.5 lg:mt-8">
                    Crafting Tradition with Modern Elegance.
                  </p>
                </div>
              </li>

              <li>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="uppercase">location</p>
                  <p className="text-sm lg:text-base">
                    Lagos: 2b Abeke Animashaun Street, Lekki Phase 1
                  </p>
                  <p className="text-sm lg:text-base">
                    Abuja: Suite 441 Kings Plaza, Jahi Express
                  </p>
                </div>
              </li>

              <li>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="uppercase">get in touch</p>
                  <p className="text-sm lg:text-base">
                    Lagos: +234 803 462 6067
                  </p>
                  <p className="text-sm lg:text-base">
                    Abuja: +234 911 401 9172
                  </p>
                  <p className="text-sm lg:text-base">
                    info@shadiatalasooke.com
                  </p>
                </div>
              </li>

              <li>
                <div>
                  <p className="uppercase">products</p>

                  <div className="mt-4 lg:mt-8">
                    <ul className="flex flex-col gap-4 lg:gap-8">
                      <li>
                        <Link href="/explore/shop-aso-oke">
                          <p className="text-sm lg:text-base"> Shop Aso Oke </p>{" "}
                        </Link>
                      </li>

                      <li>
                        <Link href="/explore/shop-rtw">
                          <p className="text-sm lg:text-base"> Shop RTW </p>{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <div>
                  <p className="uppercase">support</p>

                  <div className="mt-4 lg:mt-8">
                    <ul className="flex flex-col gap-4 lg:gap-8">
                      <li>
                        <Link href="/book-a-consultation">
                          <p> Book a Consultation </p>{" "}
                        </Link>
                      </li>

                      <li>
                        <Link href="/faq">
                          <p> FAQs </p>{" "}
                        </Link>
                      </li>

                      <li>
                        <Link href="/about/terms-and-conditions">
                          <p> Terms & Conditions </p>{" "}
                        </Link>
                      </li>

                      <li>
                        <Link href="/about/privacy-policy">
                          <p> Privacy Policy </p>{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <div>
                  <p className="uppercase">follow us on</p>

                  <div className="mt-4 lg:mt-8">
                    <ul className="flex flex-col gap-4 lg:gap-8">
                      <li>
                        <Link href="/about">
                          <p className="text-sm lg:text-base"> Facebook </p>
                        </Link>
                      </li>

                      <li>
                        <Link href="/about">
                          <p className="text-sm lg:text-base"> Instagram </p>
                        </Link>
                      </li>

                      <li>
                        <Link href="/about">
                          <p className="text-sm lg:text-base"> TikTok </p>
                        </Link>
                      </li>

                      <li>
                        <Link href="/about">
                          <p className="text-sm lg:text-base"> X </p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="my-8 lg:my-24">
            <p className="text-center text-brown-2100">
              2024 Shadiat Alasooke. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
