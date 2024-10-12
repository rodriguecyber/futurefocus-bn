import connection from "./config/db";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AdminRoutes } from "./routes/AdminRoutes";
import { StudentRoutes } from "./routes/StudentsRoutes";
import { TeamRoute } from "./routes/TeamRoutes";
import { ServiceRoute } from "./routes/ServiceRoutes";
import { CourseRoute } from "./routes/CourseRoute";
import MediaRouter from "./routes/mediaRouter";
import { paymentRouter } from "./routes/paymentRouter";
import { endIntake, startIntake } from "./jobs/StudentAutomation";
import { dailyAttendance, teamAttendance } from "./jobs/AttendanceAutomation";
import { cashRouter } from "./routes/cashFlow";
import { JobRouter } from "./routes/Job";
import { RoleRouter } from "./routes/RoleRoute";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = process.env.CORS_ALLOW
  ? process.env.CORS_ALLOW.split(",")
  : ["https://www.futurefocus.co.rw"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

connection();
startIntake();
endIntake();
dailyAttendance();
// teamAttendance()

app.get("/", (req, res) => {
  res.send("Welcome to Future Focus");
});


app.use("/admin", AdminRoutes);
app.use("/students", StudentRoutes);
app.use("/member", TeamRoute);
app.use("/service", ServiceRoute);
app.use("/course", CourseRoute);
app.use("/media", MediaRouter);
app.use("/payment", paymentRouter);
app.use("/cashflow", cashRouter);
app.use("/job", JobRouter);
app.use("/role",RoleRouter)

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
console.log(allowedOrigins)

export default app;
