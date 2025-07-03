import path from "path";
import { StatusCode } from "../../interface/StatusCode.js";
import fs from "fs/promises"

interface LogDatas{
	    level: string,
        message: string,
        resourceId: string,
        timestamp: Date,
        traceId: string,
        spanId: string,
        commit: string,
        metadata: {
            region:string
        }
}
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

    async getLogs(): Promise<{status:number,message:string,data?:LogDatas[]}>{
        try {
            const file = await fs.readFile(this.LOG_FILE,"utf-8")
            const logs = file ? JSON.parse(file) : []
            return {status:StatusCode.OK,message:"Success",data:logs}
        } catch (error) {
            console.log("Error occured while geting logs data",error);
            return{status:StatusCode.InternalServerError,message:"Internal server error"}
        }
    }
}