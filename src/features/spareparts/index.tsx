import Client from "../../api"

export const getSparePartsData = async ( data : any) => {
    try{
    const spareparts = await new Client().user.spare_parts.getAll(data);
    console.log("Spare parts fetched successfully:", spareparts);
    return spareparts;
    }
    catch(error){
        console.log("Error fetching spare parts:", error);
    }
}

export const postSparePartsData = async (data: any) => {
    try {
        const response = await new Client().user.booking_cart.post(data);
        if (!response) {
            console.warn('⚠️ post() returned no data or an empty response');
            return null;
        }
        
        // Validate response structure if needed
        if (!response.data) {
            throw new Error('Invalid response structure from server');
        }
        
        console.log("✅ Spare parts posted successfully:", response);
        return response.data; // Return the actual data part
    } catch (error) {
        console.error("❌ Error posting spare parts:", error);
        throw error;
    }
}


// check stored spare parts data

export const getSparePartsById = async (data: string) => {
    try{
        const response = await new Client().user.booking_cart.getAll(data)
        return response;

    }
    catch(error){
        console.log(error)
    }

} 