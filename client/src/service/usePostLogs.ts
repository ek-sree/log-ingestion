import { useState } from "react";
import Axios from "../api/axios/axios";
import { LOG_ENDPOINTS } from "../api/endpoints/LogEndpoints";
import type { ILogData } from "../types/ILogs";

const usePostLogs = ()=>{
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);

    const postLogs = async (data:ILogData)=>{
        setLoading(true);
        try {
            const response = await Axios.post(`${LOG_ENDPOINTS.POST_LOGS}`,data)
            if(response.status === 201){
                return true;
            }else{
                console.error("Error occured while posting logs",response.data.message)
                setError("Something went wrong");
                return false;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err:any) {
            setError(err.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return {postLogs,loading,error}
}
export default usePostLogs;