import Client from "../../../api"


export const getBookingData = async (data: any) => {
    try{
        const response = await new Client().user.service_bookings.getAll(data);
        console.log(response)
        return response;
    }
    catch (error){
        console.log(error);
    }
}