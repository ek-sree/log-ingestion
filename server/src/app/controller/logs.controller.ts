import { Request, Response } from "express";
import LogsService from "../useCase/logs.service.js";
import { StatusCode } from "../../interface/StatusCode.js";

export default class LogsController {
  private logService: LogsService;

  constructor() {
    this.logService = new LogsService();
  }

  postLogs = async (req: Request, res: Response) => {
    try {
      const {
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        metadata,
      } = req.body; 

      if (!level || !message || !resourceId || !timestamp || !traceId || !spanId || !commit) {
         res.status(400).json({ message: "Invalid request body" });
      }

      const response = await this.logService.createLog({
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        metadata,
      });
       const io = req.app.get('io'); 
    if (response.status === StatusCode.Created) {
      io.emit('new_log', req.body);
    }


       res.status(response.status).json({ message: response.message });

    } catch (error) {
      console.log("Error occurred while posting logs", error);
      res.status(StatusCode.InternalServerError).json({ message: "Internal Server Error" });
    }
  };

  getLogs = async (req:Request, res:Response)=>{
    try {
        const response = await this.logService.getLogs();
        res.status(response.status).json({message:response.message,data:response.data});
    } catch (error) {
        console.log("Error occured while getting logs",error);
        res.status(StatusCode.InternalServerError).json({message:"Internal server error"})
    }
  }
}
