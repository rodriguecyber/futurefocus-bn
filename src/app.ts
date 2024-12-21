import connection from "./config/db";
import express from "express";
const os = require("os");
import dotenv from "dotenv";
import cors from "cors";
import { endIntake, startIntake } from "./jobs/StudentAutomation";
import { dailyAttendance,
   dropout, 
   teamAttendance } from "./jobs/AttendanceAutomation";
import { indexRouter } from "./routes/indexRoutes";
import { backup } from "./jobs/backup";
import { testController } from "./controllers/updateControllere";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = process.env.CORS_ALLOW
  ? process.env.CORS_ALLOW.split(",")
  : ["https://www.futurefocus.co.rw","https://www.futurefocus.co.rw"];

app.use( 
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
connection();
startIntake();
endIntake();
dropout()
dailyAttendance();
teamAttendance();
backup()

app.get("/", (req, res) => {
  res.send("Welcome to Future Focus");
});
app.use("/api/v1", indexRouter);
app.get("/api/v1/test/", testController);



app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
 
});


export default app;
