import { Router } from "express";
import { getNotificationsController } from "../controller/notification.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const notificationRouter = Router();

notificationRouter.get("/", identifyUser, getNotificationsController);

export default notificationRouter;
