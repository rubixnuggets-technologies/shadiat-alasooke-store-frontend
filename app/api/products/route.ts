import { initialize as initializeProductModule } from "@medusajs/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return Response.json({
        data: { message: "no query provided" },
      });
    }

    const queryArray: Array<string> = JSON.parse(query);

    console.log("queryArray =>", queryArray);

    const productService = await initializeProductModule();
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
  }
}
