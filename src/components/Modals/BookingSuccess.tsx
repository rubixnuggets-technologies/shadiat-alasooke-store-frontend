"use client";
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

interface BookingSuccessProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingSuccess({ open, onClose }: BookingSuccessProps) {
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

      <div className="max-w-[260px] m-auto mt-11">
        <div className="flex justify-center mb-4">
          <div className="h-9 w-9 lg:h-14 lg:w-14 bg-[#3EB489] mb-2 flex justify-center items-center rounded-full">
            <IoMdCheckmark color="white" className="text-xl lg:text-3xl" />
          </div>
        </div>

        <p className="text-center text-lg mb-4 text-bold text-brown-dark-2100">
          Success! Your Consultation is Booked 🎉
        </p>

        <p className="text-[10px] px-4 text-brown-dark-1500 text-center">
          Thank you for booking consultation with us. Be rest assured that your
          needs will be met
        </p>
      </div>

      <div className="max-w-[336px] m-auto mt-14 mb-16">
        <ul>
          <li>
            <div>
              <p className="text-bold mb-4 text-xs"> What Happens Next? </p>
              <p className="text-brown-dark-1500 text-xs">
                <span className="font-semibold"> Confirmation Details: </span>{" "}
                We’ve sent a confirmation email with all the details of your
                booking.
              </p>

              <hr className="my-4 text-brown-light-1000" />
            </div>
          </li>

          <li>
            <div>
              <p className="text-brown-dark-1500 text-xs">
                <span className="font-semibold"> Reminders: </span> We’ll also
                send you reminders leading up to your consultation so you won’t
                miss a thing.
              </p>

              <hr className="my-4 text-brown-light-1000" />
            </div>
          </li>

          <li>
            <div>
              <p className="text-brown-dark-1500 text-xs">
                <span className="font-semibold"> What to Prepare: </span> Bring
                any questions or ideas you’d like to discuss — we’re here to
                help you achieve your goals!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
