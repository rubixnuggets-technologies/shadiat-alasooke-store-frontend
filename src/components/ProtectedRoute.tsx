"use server"
import MedusaClient from "@/utils/Medusa/MedusaClient";

const getUserData = async () => {

    console.log("FIRED!!");
    

    try {
        // const user = await MedusaClient.customers.retrieve();

        // console.log(user);
        

    } catch (error) {
        console.log("auth err:", error);
    }
}

export default async function ProtectedRoute({ children }) {
    const user = await getUserData();

    return (
        <>
            {children}
        </>
    )
}