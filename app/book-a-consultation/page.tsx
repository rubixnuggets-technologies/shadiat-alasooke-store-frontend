import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Button from "@/src/components/ui/button";
import { SanityClient } from "@/utils/Sanity/client";
import { HOME_PAGE_QUERY } from "@/utils/Sanity/gqols";

const getPageData = async () => {
  const data = await SanityClient().fetch(HOME_PAGE_QUERY);

  return {
    data: data[0],
  };
};

export default async function BookAConsultationPage() {
  const { data } = await getPageData();

  return (
    <div>
      <Header />
      {/* <Hero data={[data?.hero[0]]} /> */}

      <div className="mt-12 mb-12">
        <div className="layout">
          <h1 className="text-2xl"> Consultation Booking Form </h1>

          <div className="flex flex-row" >
            <div>
              <form action="">
                <div>
                  <input type="text" placeholder="full name*" />{" "}
                </div>
                <div>
                  <input type="email" placeholder="email*" />{" "}
                </div>
                <div>
                  <input type="number" placeholder="phone number*" />{" "}
                </div>
                <div>
                  <input type="text" placeholder="pick a consultant*" />{" "}
                </div>
                <div>
                  <input type="text" placeholder="date for consultation*" />{" "}
                </div>
                <div>
                  <input type="text" placeholder="consultation type*" />{" "}
                </div>
                <div>
                  <input type="text" placeholder="additional message*" />{" "}
                </div>

                <div>
                  <Button title="Book A Consultation" />
                </div>
              </form>
            </div>

            <div>
                <div className="" >

                </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
