import { initialize as initializeProductModule } from "@medusajs/product";
import { NextRequest, NextResponse } from "next/server";

const generateSortOptions = (sort: string): any => {
  switch (sort) {
    case "PRICE_LOW_TO_HIGH":
      return "-variants.prices.amount";

    case "PRICE_HIGH_TO_LOW":
      return "variants.prices.amount";

    default:
      return {
        created_at: "DESC",
      };
  }
};

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const limit = searchParams.get("limit");
    const collectionId = searchParams.get("collection");
    const pagination = searchParams.get("page");
    const sort = searchParams.get("sort");

    if (!query) {
      return Response.json({
        data: { message: "no query provided" },
      });
    }

    const queryArray: Array<string> = JSON.parse(query);

    if (sort === "PRICE_LOW_TO_HIGH" || sort === "PRICE_HIGH_TO_LOW") {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_ENDPOINT}/store/products?order=${generateSortOptions(sort!)}&limit=${limit}&collection_id[]=${collectionId}`
      );

      const data = await request.json();

      return Response.json({
        data: { products: data?.products, total: data?.count },
      });
    }

    const productService = await initializeProductModule();

    if (collectionId) {
      let filters = {
        collection_id: collectionId,
      };

      // medusa returns a single item when undefined tag is specified, hence, the need to remove the tags arr when not provided
      if (queryArray?.length >= 1) {
        filters = {
          ...filters,
          tags: {
            value: queryArray,
          },
        };
      }

      const [products, count] = await productService.listAndCount(filters, {
        order: {
          created_at: "DESC",
        },
        relations: ["variants"],
        skip: parseInt(limit!) * (parseInt(pagination!) || 0),
        take: parseInt(limit!),
      });

      return Response.json({
        data: { products: products, total: count },
      });
    }

    const products = await productService.list({
      tags:
        queryArray?.length >= 1
          ? {
              value: queryArray,
            }
          : undefined,
    });

    return Response.json({
      data: products,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      error: error,
    });
  }
}
