import Link from "next/link";
import Button from "../ui/button";

export default function EmptySearchResults() {
  return (
    <div>
      <div className="layout">
        <h1 className="text-xl lg:text-[40px] text-center">No Search Results</h1>
        <p className="text-sm lg:text-base text-center">No results could be found.</p>

        <div className="flex justify-center mt-4 lg:mt-12 mb-8 lg:mb-24">
          <Link href="/ready-to-wear">
            <Button title="Shop Now" />
          </Link>
        </div>
      </div>
    </div>
  );
}
