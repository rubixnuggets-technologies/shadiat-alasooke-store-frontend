"use client";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import Image from "next/image";
import Link from "next/link";

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const Footer = () => {
  return (
    <footer className="bg-brown-100 mt-8 py-24">
      <div className="layout">
        <div>
          <h1 className="text-3xl text-brown-2100 text-center mb-2">
            Stay Updated with Shadiat Alasooke
          </h1>

          <p className="text-center text-brown-2100">
            Subscribe to our newsletter for the latest updates, exclusive
            offers, and fashion tips.
          </p>

          <div className="mt-10 flex  justify-center">
            <div className="border-2 w-[600px] h-12 flex flex-row border-brown-2100">
              <input
                className="w-full bg-brown-100 text-2100 px-4"
                placeholder="Enter your email address"
              />

              <button className="bg-brown-2100 text-brown-100 w-44">
                Susbscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <ul className="grid grid-cols-6 gap-24 content-stretch">
            <li>
              <div className="max-w-32">
                <Image
                  src={HERO_URL}
                  alt="Shadiat Alasooke"
                  loader={ImageLoader}
                  width={100}
                  height={100}
                />

                <p className="text-brown-2100 mt-8">
                  Crafting Tradition with Modern Elegance.
                </p>
              </div>
            </li>

            <li>
              <div>
                <p className="uppercase">location</p>
                <p className="mt-8">
                  Lagos: 2b Abeke Animashaun Street, Lekki Phase 1
                </p>
                <p className="mt-8">
                  Abuja: Suite 441 Kings Plaza, Jahi Express
                </p>
              </div>
            </li>

            <li>
              <div>
                <p className="uppercase">get in touch</p>
                <p className="mt-8">Lagos: +234 803 462 6067</p>
                <p className="mt-8">Abuja: +234 911 401 9172</p>
                <p className="mt-8">info@shadiatalasooke.com</p>
              </div>
            </li>

            <li>
              <div>
                <p className="uppercase">navigation link</p>

                <div className="mt-8">
                  <ul className="grid gap-8">
                    <li>
                      <Link href="/about">
                        <p> Shop Aso Oke </p>{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> Shop RTW </p>{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> Shop RTW </p>{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> About Us </p>{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> My Account </p>{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> My Cart </p>{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <div>
                <p className="uppercase">support</p>

                <div className="mt-8">
                  <ul className="grid gap-8">
                    <li>
                      <Link href="/about">
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

                <div className="mt-8">
                  <ul className="grid gap-8">
                    <li>
                      <Link href="/about">
                        <p> Facebook </p>
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> Instagram </p>
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> TikTok </p>
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <p> X </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-24">
          <p className="text-center text-brown-2100">
            2024 Shadiat Alasooke. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
