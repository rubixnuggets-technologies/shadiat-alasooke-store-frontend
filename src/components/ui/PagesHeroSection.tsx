import Breadcrumb from "./Breadcrumb";

export default function PagesHeroSection({ breadcrumbItems, title }) {
  return (
    <div >
      <div className="my-8 lg:mt-16">
        <div className="flex mb-1 lg:mb-4 justify-center w-full ">
          <Breadcrumb
            items={breadcrumbItems}
          />
        </div>

        <h1 className="text-3xl lg:text-[40px] text-center font-normal">
          {title}
        </h1>
      </div>

      <hr className="text-[#E8D4C1]" />
    </div>
  );
}
