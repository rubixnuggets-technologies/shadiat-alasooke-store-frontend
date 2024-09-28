"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: Record<"text" | "route", string>[];
}) {
  const pathname = usePathname();
  const allPaths = pathname.split("/");



  return (
    <div className="flex flex-row gap-2">
      {items?.map(({ route, text }, index) => (
        <div key={index}>
          <Link href={route}>
            <p className={`text-xs`}>
              {text} {index + 1 !== items?.length && "/"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
