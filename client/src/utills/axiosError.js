import axios from "axios"



export const axiosError=(error)=>{
    if(axios.isAxiosError(error))
    {
        if(error.response)
        {
    return error.response.data.message;        
        }
        else{
            return "An unexpected error occurred"
        }
    }
}