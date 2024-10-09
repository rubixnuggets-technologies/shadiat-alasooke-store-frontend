import Dollar from "../../src/assets/custom-icons/dollar.svg";
import Note from "../../src/assets/custom-icons/note.svg";

import ConsultationForm from "../../src/components/forms/ConsultationForm";
import CTA from "@/src/components/ui/CTA";

const CONULTATION_IMAGE = `
  https://res.cloudinary.com/demw3uawq/image/upload/v1723579979/alasooke-project/hero-images/ueasvry9y9wfsoz0asr1.png
`;

export default function BookAConsultationPage() {
  return (
    <div>
      <div className="flex w-full mb-7 lg:grid lg:grid-cols-[720px_auto]">
        <div className="hidden lg:flex items-center justify-center h-full w-full bg-brown-200">
          <div className="flex flex-col">
            <CTA text="Book a Consultation with Us" />

            <h1 className="text-[40px] max-w-[375px] text-brown-2100">
              Ready to bring your vision to life?
            </h1>
          </div>
        </div>

        <div className="w-full">
          <img
            src={CONULTATION_IMAGE}
            className="h-[393px] lg:h-[496px] w-full object-cover object-top"
            alt={"Consultation"}
          />
        </div>
      </div>

      <div className="mx-8 lg:max-w-[800px] lg:m-auto">
        <h1 className="text-[20px] text-brown-2100 lg:text-[40px]">
          Consultation Booking Form{" "}
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-[431px_auto]">
          <ConsultationForm />

          <div className="flex justify-center lg:ml-40">
            <div className="bg-brown-100 mt-14 lg:mt-1 py-8 px-12 max-w-full lg:max-w-[265px]">
              <div className="flex flex-col">
                <div className="flex flex-row mb-3.5">
                  <Note />

                  <div className="flex items-center">
                    <p className="ml-2.5 text-gold-1500 text-base">Note</p>
                  </div>
                </div>

                <ul className="list list-disc	 flex flex-col gap-2">
                  <li>
                    <p>
                      A consultation session with the Creative Director requires
                      a fee of ₦20,000 ($30). This fee will be deducted from the
                      overall cost if you choose to proceed after the
                      consultation.
                    </p>
                  </li>

                  <li>
                    <p>All meeting times are in W.A.T.</p>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="flex flex-row mb-3.5">
                  <Dollar />

                  <div className="flex items-center">
                    <p className="ml-2.5 text-green-600 text-base">
                      Kindly pay into:
                    </p>
                  </div>
                </div>

                <ul className="list flex flex-col gap-2">
                  <li>
                    <p>
                      PayPal (use friends & family): Shadiatalasooke@gmail.com
                    </p>
                  </li>

                  <li>
                    <p>
                      Click here to send proof of payment (if meeting with the
                      Creative Director).
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
