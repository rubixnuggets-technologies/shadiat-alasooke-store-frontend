import Medusa from "@medusajs/medusa-js";

const MedusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_ENDPOINT || "",
  maxRetries: 3,
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_TOKEN,
});

export default MedusaClient;
