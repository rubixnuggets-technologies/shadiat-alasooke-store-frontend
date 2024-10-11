import { initialize as initializeProductModule } from "@medusajs/product";
import { NextRequest, NextResponse } from "next/server";

// {
//   key: "NEW_ARRIVAL",
//   value: "New Arrival",
// },
// {
//   key: "PRICE_LOW_TO_HIGH",
//   value: "Price: Low to High",
// },
// {
//   key: "PRICE_HIGH_TO_LOW",
//   value: "Price: High to Low",
// },

const generateSortOptions = (sort: string): { [K: string]: "DESC" | "ASC" } => {
  switch (sort) {
    // case "NEW_ARRIVAL":
    //   return {
    //     created_at: "DESC",
    //   };

    // case "PRICE_LOW_TO_HIGH":
    //   return {
    //     ['metadata.BASE_PRICE']: "ASC",
    //   };

    // case "PRICE_HIGH_TO_LOW":
    //   return {
    //     price: "DESC",
    //   };

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

      const [products, count] = await productService.listAndCount(
        {
          ...filters,
        },
        {
          order: generateSortOptions(sort!),
          relations: ["variants"],
          skip: parseInt(limit!) * (parseInt(pagination!) || 0),
          take: parseInt(limit!),
        }
      );

      return Response.json({
        data: { products: products, total: count },
      });
    }

    const products = await productService.list(
      {
        tags:
          queryArray?.length >= 1
            ? {
                value: queryArray,
              }
            : undefined,
      },
      {
        // order: "ASC"
        // take: parseInt(limit!),
        // take: limit ? parseInt(limit) : undefined,
        // relations: ["products"],
      }
    );

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
