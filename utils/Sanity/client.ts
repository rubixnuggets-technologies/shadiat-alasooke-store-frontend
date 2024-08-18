import { createClient } from "next-sanity";
// import { apiConfig } from "@/config/envApi";

const apiConfig = {
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID || "",
    project_dataset: process.env.NEXT_PUBLIC_PROJECT_DATASET || "",
    api_version: process.env.NEXT_PUBLIC_PROJECT_API_VERSION || "",
    sanity_token: process.env.NEXT_PUBLIC_SANITY_TOKEN || ""
}

export const SanityClient = () => {
  if (!apiConfig.api_version || !apiConfig.sanity_token || !apiConfig.project_id) {
    throw new Error("Sanity CMS configurations are misssing!");
  }

  return createClient({
    projectId: apiConfig.project_id,
    dataset: apiConfig.project_dataset,
    apiVersion: apiConfig.api_version,
    token: apiConfig.sanity_token,
    useCdn: process.env.NODE_ENV === "production"
  });
};

// The consultation will help turn their vision into reality
// The immediate availability of trendy styles
// Promotes the versatility of RTW collection