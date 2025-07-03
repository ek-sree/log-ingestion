import { useEffect, useState } from "react";
import Axios from "../api/axios/axios";
import { LOG_ENDPOINTS } from "../api/endpoints/LogEndpoints";
import type { ILogData } from "../types/ILogs";
import socket from "../sockets/socket";

const useFetchLogs = () =>{
    const [logs,setLogs] = useState<ILogData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLogs = async ()=>{
        try {
            setError(null)
            setLoading(true);
            
            const response = await Axios.get(`${LOG_ENDPOINTS.GET_LOGS}`);
console.log("LOF",response);

            if(response.status === 200){
                setLogs(response.data.data);
            }else{
                console.log("Failed to fetch logs",response);
                setError(`Failed to fetch logs with status code ${response.status}`);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log("Error occured while fetching logs",error);
            setError(error?.message || "Something went wrong!");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchLogs();
    },[])


    useEffect(() => {
    socket.on("new_log", (newLog: ILogData) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    return () => {
      socket.off("new_log");
    };
  }, []);


    return {logs,error,loading};
}

export default useFetchLogs;
