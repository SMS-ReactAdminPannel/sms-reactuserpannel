import Client from "../../api"

export const getSparePartsData = async ( data : any) => {
    try{
    const spareparts = await new Client().user.spare_parts.getAll(data);
    console.log(spareparts);
    return spareparts;
    }
    catch(error){
        console.log("Error fetching spare parts:", error);
    }
}

export const postSparePartsData = async (data: any) => {
    try {
        const response = await new Client().user.booking_cart.post(data);
        return response.data; // Return the actual data part
    } catch (error) {
        console.error("❌ Error posting spare parts:", error);
        throw error;
    }
}


// check stored spare parts data

export const getBookingCartData = async (data: string) => {
    try{
        const response = await new Client().user.booking_cart.getAll(data)
        return response;

    }
    catch(error){
        console.log(error)
    }

} 