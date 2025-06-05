import Client  from "../../../api";
import  ServiceCategory  from '../../../api/index';

// export const getservicesoveralldata = async ( data : any ) => {
//     try {
//         const overallservice =await new Client().user.services.service_category.getAll(data);
//         return overallservice;
//     }
//     catch (error) {
//         console.log("error on overall parts",error);
//     }
// }



export const getsenddata = async (): Promise<ServiceCategory[]> => {
    try {
        const client = new Client();
        const response = await client.user.services.service_category.post();

        if (response?.data?.data && Array.isArray(response.data.data)) {
            return response.data.data as ServiceCategory[];
        } else {
            console.warn("Unexpected response format:", response);
            return [];
        }
    } catch (error) {
        console.error("Error fetching services:", (error as Error).message || error);
        return [];
    }
};


  

export const getservicesoveralldata = async (): Promise<ServiceCategory[]> => {
    try {
        const client = new Client();
        const response = await client.user.services.service_category.getAll();

        if (response?.data?.data && Array.isArray(response.data.data)) {
            return response.data.data as ServiceCategory[];
        } else {
            console.warn("Unexpected response format:", response);
            return [];
        }
    } catch (error) {
        console.error("Error fetching services:", (error as Error).message || error);
        return [];
    }
};

export const getservicebyid = async (): Promise<ServiceCategory[]> => {
    try {
        const client = new Client();
        const response = await client.user.services.service_category.getById();

        if (response?.data?.data && Array.isArray(response.data.data)) {
            return response.data.data as ServiceCategory[];
        } else {
            console.warn("Unexpected response format:", response);
            return [];
        }
    } catch (error) {
        console.error("Error fetching services:", (error as Error).message || error);
        return [];
    }
};