import path from "path";
import { StatusCode } from "../../interface/StatusCode.js";
import fs from "fs/promises"
import { FilterParams, LogDatas } from "../../interface/ILogData.js";


export default class LogsService {

    private LOG_FILE = path.join(process.cwd(),"logs","log.json")

    async createLog(log: any):Promise<{status:number,message:string}>{
        try {
            const file = await fs.readFile(this.LOG_FILE, "utf-8")

            const logs = file ? JSON.parse(file) : [];

            logs.push(log)

            await fs.writeFile(this.LOG_FILE,JSON.stringify(logs,null,2))

            return {status:StatusCode.Created,message:"Log created successfully"}
        } catch (error) {
            console.log("Error creating log",error);
            return {status:StatusCode.InternalServerError,message:"Internal server error"}
        }
    }
    

    async getLogs(filters:FilterParams): Promise<{status:number,message:string,data?:LogDatas[]}>{
         const file = await fs.readFile(this.LOG_FILE, "utf-8");
    let logs: LogDatas[] = file ? JSON.parse(file) : [];

    logs = logs.filter(log => {
      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) return false;
      if (filters.level && log.level !== filters.level) return false;
      if (filters.resourceId && !log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())) return false;
      if (filters.timestamp_start && new Date(log.timestamp) < new Date(filters.timestamp_start)) return false;
      if (filters.timestamp_end && new Date(log.timestamp) > new Date(filters.timestamp_end)) return false;
      return true;
    });

    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedLogs = logs.slice(startIndex, startIndex + filters.limit);

    return { status: StatusCode.OK, message: "Success", data: paginatedLogs };
  } catch (error:any) {
    console.log("Error filtering logs", error);
    return { status: StatusCode.InternalServerError, message: "Internal server error", data: [] };
  }
}