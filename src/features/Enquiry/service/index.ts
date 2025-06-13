import Client from "../../../api"

export const postEnquiryData = async (data: any) => {
    try{
    const response = new Client().user.enquiry.post(data);
    console.log("Enquiry response", response);
    return response;
    }
    catch (error) {
        console.error("Error posting enquiry:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const getEnquiryData = async (data: any) => {
    try{
        const response = new Client().user.enquiry.getAll(data);
        console.log("Enquiry data fetched:", response);
        return response;
    }
    catch(error) {
        console.error("Error fetching enquiry data:", error);
        throw error; // Re-throw the error for further handling if needed   
    }
}