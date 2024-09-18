import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

const Page = ({ children }: { children: any }) => {
  return (
    <div>
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Page;
