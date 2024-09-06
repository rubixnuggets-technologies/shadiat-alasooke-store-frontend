import Header from "@/src/components/Header";

const Page = ({ children }: { children: any }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default Page;
