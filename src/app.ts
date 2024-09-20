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
import { paymantRouter } from "./routes/paymantRouter";
import { endIntake, startIntake } from "./jobs/StudentAutomation";
import { dailyAttendance } from "./jobs/AttendanceAutomation";
import { cashRouter } from "./routes/cashFlow";
import { JobRouter } from "./routes/Job";
// import mediaRoute from "./routes/mediaRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// CORS configuration
app.use(
  cors(
    {
    origin: process.env.CORS_ALLOW as string || "https://www.futurefocus.co.rw",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
)
);

app.use(express.json());

connection();
startIntake()
endIntake()
dailyAttendance()
app.get("/", (req, res) => {
  res.send("welcome to future focus"); 
});

app.use("/admin", AdminRoutes);
app.use("/students", StudentRoutes);
app.use("/member", TeamRoute);
app.use("/service", ServiceRoute);
app.use("/course", CourseRoute);
app.use("/media",MediaRouter)
app.use("/payment",paymantRouter)
app.use("/cashflow",cashRouter)
app.use("/job",JobRouter)

app.listen(PORT, () => {
  console.log(`app is listening to http://localhost:${PORT}`);
});

export default app;
