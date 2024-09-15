import Link from "next/link";
import Button from "../ui/button";

export default function EmptySearchResults() {
  return (
    <div>
      <div className="layout">
        <h1 className="text-[40px] text-center">No Search Results</h1>
        <p className="text-center">No results could be found.</p>

        <div className="flex justify-center mt-12 mb-24">
          <Link href="/explore/shop-rtw">
            <Button title="Shop Now" />
          </Link>
        </div>
      </div>
    </div>
  );
}
