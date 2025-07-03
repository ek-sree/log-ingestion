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

getLogs = async (req: Request, res: Response) => {
  try {
    const { message, level, resourceId, timestamp_start, timestamp_end, page = 1, limit = 5 } = req.query;
console.log("api call limit");

    const filters = {
      message: message?.toString() || '',
      level: level?.toString() || '',
      resourceId: resourceId?.toString() || '',
      timestamp_start: timestamp_start?.toString() || '',
      timestamp_end: timestamp_end?.toString() || '',
      page: Number(page),
      limit: Number(limit),
    };

    const response = await this.logService.getLogs(filters);

    res.status(response.status).json({ message: response.message, data: response.data });
  } catch (error) {
    console.log("Error occurred while getting logs", error);
    res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
  }
};

}
