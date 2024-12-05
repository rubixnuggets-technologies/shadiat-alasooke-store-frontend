import { NextRequest, NextResponse } from "next/server";

const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;

console.log("ENV VARS =>", process.env)

export async function GET(request: NextRequest, res: NextResponse) {
  if (!GEOLOCATION_API_KEY) {
    return Response.json(
      {
        error: "GEOLOCATION_API_KEY is missing!",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get("location");

    if (!location) {
      return Response.json(
        {
          error: "Location is required",
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    } 

    const req = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${GEOLOCATION_API_KEY}&region=ng`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (req.status !== 200) {
      return Response.json(
        {
          error: "Failed to fetch location",
        },
        {
          status: 500,
          statusText: "Internal Server Error",
        }
      );
    }

    const response = await req.json();

    return Response.json({
      data: response,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: error,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
