"use server";
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_SOID = process.env.ZOHO_SOID;
const ZOHO_ACCOUNTS_ENDPOINT = process.env.ZOHO_ACCOUNTS_ENDPOINT;
const ZOHO_API_ENDPOINT = process.env.ZOHO_API_ENDPOINT;

if (!ZOHO_CLIENT_SECRET || !ZOHO_CLIENT_ID || !ZOHO_SOID) {
  throw new Error("Zoho credentials are missing");
}

export const generateToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append("client_id", ZOHO_CLIENT_ID);
    params.append("client_secret", ZOHO_CLIENT_SECRET);

    params.append("grant_type", "client_credentials");
    params.append("scope", "ZohoCRM.modules.all");
    params.append("soid", ZOHO_SOID);

    const request = await fetch(`${ZOHO_ACCOUNTS_ENDPOINT}/oauth/v2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    return await request.json();
  } catch (error) {
    console.error(error);
  }
};

export const addEmail = async (email: string) => {
  try {
    const token = await generateToken();

    if (!token.access_token) {
      throw new Error("Invalid token");
    }

    const request = await fetch(`${ZOHO_API_ENDPOINT}/crm/v7/Email_Lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        data: [
          {
            Email: email,
          },
        ],
      }),
    });

    const { data } = await request.json();

    // Zoho API returns array of objects for bulk adds.
    return data[0];
  } catch (error) {
    console.error(error);
  }
};

interface ConsultationDetails {
  Name: string;
  Email: string;
  Phone_Number: string;
  Consultant: string;
  Consultation_Type: string;
  Additional_Message: string;
  Date: string;
  Time: string;
}

export const bookConsultation = async (data: ConsultationDetails) => {
  try {
    const token = await generateToken();

    if (!token.access_token) {
      throw new Error("Invalid token");
    }

    const request = await fetch(`${ZOHO_API_ENDPOINT}/crm/v7/Bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        data: [data],
      }),
    });

    const response = await request.json();

    return response
  } catch (error) {
    console.error(error);
  }
};

interface PreOrderDetails {
  Name: string
  Email: string
  Phone_Number: string
  Preferred_Contact_Method: string
  Additional_Message: string
  Collection_Type: string
}

export const preOrderNative = async (data: PreOrderDetails) => {
  try {
    const token = await generateToken();

    if (!token.access_token) {
      throw new Error("Invalid token");
    }

    const request = await fetch(`${ZOHO_API_ENDPOINT}/crm/v7/Pre_Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        data: [data],
      }),
    });

    return await request.json();
  } catch (error) {
    console.error(error);
  }
};
