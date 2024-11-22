import connection from "./config/db";
import express from "express";
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
//array holding front-ends wich are allowed to access backend
const allowedOrigins = process.env.CORS_ALLOW
  ? process.env.CORS_ALLOW.split(",")
  //altenative if doesn't get array from .env
  : ["https://www.futurefocus.co.rw","https://www.futurefocus.co.rw"];

app.use(
  cors({
    // replace the array here
    origin: allowedOrigins,
    //methods allowed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    //allowed headers
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
app.post("/api/v1/test/", testController);



app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});


export default app;
