import { Router } from "express";
import { AdminRoutes } from "../routes/AdminRoutes";
import { cashRouter } from "../routes/cashFlow";
import { CourseRoute } from "../routes/CourseRoute";
import { JobRouter } from "../routes/Job";
import { paymentRouter } from "../routes/paymentRouter";
import { RoleRouter } from "../routes/RoleRoute";
import { ServiceRoute } from "../routes/ServiceRoutes";
import { StudentRoutes } from "../routes/StudentsRoutes";
import { taskRouter } from "../routes/taskRoutes";
import { TeamRoute } from "../routes/TeamRoutes";
import MediaRouter from "../routes/mediaRouter";


export const indexRouter = Router()
indexRouter.use("/admin", AdminRoutes);
indexRouter.use("/students", StudentRoutes);
indexRouter.use("/member", TeamRoute);
indexRouter.use("/service", ServiceRoute);
indexRouter.use("/course", CourseRoute);
indexRouter.use("/media", MediaRouter);
indexRouter.use("/payment", paymentRouter);
indexRouter.use("/cashflow", cashRouter);
indexRouter.use("/job", JobRouter);
indexRouter.use("/role", RoleRouter);
indexRouter.use("/task", taskRouter);