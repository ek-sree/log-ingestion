import {Router} from "express"
import LogsController from "../controller/logs.controller.js"

const logsRouter = Router()

const logsController = new LogsController()

logsRouter.post('/post-logs', logsController.postLogs)
logsRouter.get('/get-logs', logsController.getLogs);

export default logsRouter