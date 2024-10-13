"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";

export interface BreadcrumbItemProps {
  items: Record<"text" | "route", string>[];
}

export default function Breadcrumb({ items }: BreadcrumbItemProps) {
  const pathName = usePathname();

  return (
    <div className="flex flex-row gap-2">
      {items?.map(({ route, text }, index) => (
        <div key={index}>
          <Link href={route}>
            <p
              className={cn(
                "text-xs",
                pathName === route ? "text-brown-dark-1500 font-bold" : "text-brown-light-1500"
              )}
            >
              {text} {index + 1 !== items?.length && "/"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
