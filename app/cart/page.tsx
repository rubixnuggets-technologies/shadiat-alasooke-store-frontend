import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import CartWrapper from "./CartWrapper";

export default function Page() {
  return (
    <div>
      <Header />

      <div className="layout">
        <CartWrapper />
      </div>

      <Footer />
    </div>
  );
}
