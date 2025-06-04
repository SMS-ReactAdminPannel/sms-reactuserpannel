import Client from "../../../api";

export const booking_cart = async ( data : any) => {
try{
    const BOOKINGCARTINDEX = await new Client().user.booking_cart.getAll(data)
    return BOOKINGCARTINDEX;
}
catch(error){
    console.log("Error bookingCart",error)
}
}