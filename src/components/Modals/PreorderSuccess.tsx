"use client";
import { useState } from "react";
import Modal, { Styles } from "react-modal";
import Image from "next/image";
import { ImageLoader } from "@/utils/helpers/Cloudinary";
import { IoMdCheckmark } from "react-icons/io";

const HERO_URL = "/alasooke-project/mzdijupfwpi4tscjk5ya";

const customStyles: Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
    width: "605px",
    padding: 0,
    border: 0,
  },
};

interface PreorderSuccessProps {
  open: boolean;
  onClose: () => void;
}

export default function PreorderSuccess({
  open,
  onClose,
}: PreorderSuccessProps) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      preventScroll
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      style={customStyles}
      contentLabel="Order Successfull"
    >
      <div className="bg-[#0C0B0A]">
        <div className="flex flex-col justify-center items-center py-14">
          <div className="relative w-16 h-8 mb-4 lg:w-[116px] lg:h-[56px]">
            <Image
              src={HERO_URL}
              alt="Shadiat Alasooke"
              loader={ImageLoader}
              fill
              className="absolute object-cover"
            />
          </div>

          <p className="text-white text-xs">
            Crafting Tradition with <br /> Modern Elegance.
          </p>
        </div>
      </div>

      <div className="max-w-[290px] m-auto mt-11">
        <div className="flex justify-center mb-4">
          <div className="h-9 w-9 lg:h-14 lg:w-14 bg-[#3EB489] mb-2 flex justify-center items-center rounded-full">
            <IoMdCheckmark color="white" className="text-xl lg:text-3xl" />
          </div>
        </div>

        <p className="text-center text-lg mb-4 text-bold text-brown-dark-2100">
          Your Pre-Order is Confirmed! Thank You for Choosing Shadiat Alasoke.
        </p>

        <p className="text-xs px-4 text-brown-dark-1500 text-center">
          Thank you for your pre-order! We are excited to start crafting your
          exclusive Aso Oke Iro and Buba set
        </p>
      </div>

      <div className="max-w-[336px] m-auto mt-14 mb-16">
        <ul>
          <li>
            <div>
              <p className="text-bold mb-4 text-xs"> What Happens Next? </p>
              <p className="text-brown-dark-1500 text-xs">
                Order Confirmation: Our team will review your order and reach
                out to confirm all details within the next 24-48 hours.
              </p>

              <hr className="my-4 text-brown-light-1000" />
            </div>
          </li>

          <li>
            <div>
              <p className="text-brown-dark-1500 text-xs">
                Crafting Your Aso Oke: Once confirmed, our artisans will begin
                handcrafting your Aso Oke Iro and Buba set with the utmost care
                and precision.
              </p>

              <hr className="my-4 text-brown-light-1000" />
            </div>
          </li>

          <li>
            <div>
              <p className="text-brown-dark-1500 text-xs">
                Delivery Updates: We will keep you updated on the progress of
                your order and notify you once it’s ready to be shipped.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
