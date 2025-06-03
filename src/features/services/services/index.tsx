import Client  from "../../../api";

// export const getservicesoveralldata = async ( data : any ) => {
//     try {
//         const overallservice =await new Client().user.services.service_category.getAll(data);
//         return overallservice;
//     } 
//     catch (error) {
//         console.log("error on overall parts",error);
//     }
// } 

export const getservicesoveralldata = async (): Promise<ServiceCategory[]> => {
    try {
        const client = new Client();
        const response = await client.user.services.service_category.getALL();
        return response.data.data; // assuming this is where actual list is
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};
  