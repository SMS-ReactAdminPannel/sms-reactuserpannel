import Client from "../../../api";

interface BookingCartData {
  userId?: string;
  token?: string;

}

export const booking_cart = async (data: BookingCartData) => {
  try {
    const response = await new Client().user.booking_cart.getAll(data);
    console.log("Booking Cart Response:", response);
    return response;
  } catch (error: any) {
    console.error("Error fetching booking cart:", error?.response || error?.message || error);
    return null; 
  }
};
