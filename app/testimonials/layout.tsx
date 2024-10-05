import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      {children}

      <Footer />
    </div>
  );
}
