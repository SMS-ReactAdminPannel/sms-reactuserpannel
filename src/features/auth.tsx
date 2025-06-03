import Client from "../../src/api"

export const loginUser = async (data:any) => {
  try{
    const response = await new Client().user.auth.login(data)
    return response;
  }catch(error){
    console.error("Error logging in:", error);
    throw error
  }
}

export const signUp =async (data : any) =>{
  try{
      const response =await  new Client().user.auth.signUp(data)
      return response;
  }catch(error){
      console.error("Error signing up:", error);
        throw error;
    }
    }
  export const verifyotp =async (data:any) =>{
    try{
      const response =await new Client().user.auth.verify_otp(data)
      return response;
    }catch(error){
      throw error;
      console.error("Error verifying OTP:", error);
    }
  }

  

