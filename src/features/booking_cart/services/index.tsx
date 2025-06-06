import Client from "../../../api";

interface BookingCartData {
  userId?: string;
  token?: string;

}

export const booking_cart = async (data: BookingCartData) => {
  try {
    const response = await new Client().user.booking_cart.getAll(data);
    console.log("Booking Cart  spare Response:", response);
    return response;
  } catch (error: any) {
    console.error("Error fetching booking cart:", error?.response || error?.message || error);
    return null; 
  }
};


// export const booking_cartpost=async(data:BookingCartData)=>{
//   try{
//     const response=await new Client().user.booking_cart.post(data);
//     console.log("Booking cart post response:",response);
//     return response;
//   }catch (error:any){
//    console.error("Error",error?.response|| error?.message||error);
//    return null
//   }
// }


// export const ServiceBookingPage =async(data:BookingCartData)=>{
//   try{
//     const response =await new Client().user.booking_cart.getAll(data);
//     console.log("Booking Cart service Response:",response);
//     return response;
//   }catch(error:any){
//     console.error("Error fetching booking Cart service page",error?.message|| error)
//     return null
//   }
// }