import CartCost from "@/src/components/Cart/CartCost";
import CartTable from "@/src/components/Cart/CartTable";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function Page() {
  return (
    <div>
      <Header />

      <div>
        <div className="mb-12">
          <h1 className="text-[40px] text-center">My Cart</h1>
        </div>

        <hr className="text-brown-1000" />
      </div>

      <div className="layout">
        <div className="mt-12 grid grid-cols-[732px_auto]">
          <CartTable />
        
        <div className="flex justify-end" >  
            <CartCost />
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
