import connection from "./config/db";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AdminRoutes } from "./routes/AdminRoutes";
import { StudentRoutes } from "./routes/StudentsRoutes";
import { TeamRoute } from "./routes/TeamRoutes";
import { ServiceRoute } from "./routes/ServiceRoutes";
import { CourseRoute } from "./routes/CourseRoute";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://futurefocus-bn.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

connection();

app.get("/", (req, res) => {
  res.send("welcome to future focus");
});

app.use("/admin", AdminRoutes);
app.use("/students", StudentRoutes);
app.use("/member", TeamRoute);
app.use("/service", ServiceRoute);
app.use("/course", CourseRoute);

app.listen(PORT, () => {
  console.log(`app is listening to http://localhost:${PORT}`);
});

export default app;
