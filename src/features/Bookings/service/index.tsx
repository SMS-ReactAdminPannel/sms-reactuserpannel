import Client from "../../../api"


export const getBookingAll = async (data: any) => {
    try{
        const response = await new Client().user.bookings.getAll(data)
        console.log('All booking data :',response)
        return response;
    }
    catch (error){
        console.log(error);
    }
}

export const getBookingProduct = async (data: any) => {
    try{
        const response = await new Client().user.bookings.getProduct(data)
        console.log('get product data :',response)
        return response;
    }
    catch(error){
        console.log(error)
    }
}

export const getBookingService = async (data: any) => {
    try{
        const response = await new Client().user.bookings.getService(data)
        console.log('get Service data : ',response)
        return response
    }
    catch(error){
        console.log(error)
    }
}