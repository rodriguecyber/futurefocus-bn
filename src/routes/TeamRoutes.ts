import { Router } from "express";
import { TeamControllers } from "../controllers/TeamControllers";
import { checkLocation } from "../middleware/checkLocation";
export interface Location {
  latitude: number;
  longitude: number;
}
const allowedLocation: Location = {
  latitude: -1.9507,
  longitude: 30.0663,
};
export const TeamRoute = Router()
TeamRoute.post("/two-factor/:id", TeamControllers.verifyOTP);
TeamRoute.post("/new", TeamControllers.AddMember)
TeamRoute.get("/", TeamControllers.Team)
TeamRoute.get("/admins", TeamControllers.teamAdmins)
TeamRoute.delete("/delete/:id", TeamControllers.deleteMember)
TeamRoute.put("/update/:id", TeamControllers.update)
TeamRoute.put(
  "/request-attend/:id",
  checkLocation(allowedLocation, 20),
  TeamControllers.requestAttend
);
TeamRoute.put(
  "/approve-attend/:id",
  checkLocation(allowedLocation, 100),
  TeamControllers.approveAttend
);
TeamRoute.get("/attendance", TeamControllers.attendance)
TeamRoute.get("/my-attendance/:id", TeamControllers.myAttendance)
TeamRoute.post("/forgot-password", TeamControllers.forgotPassword);
TeamRoute.post("/login", TeamControllers.login);
TeamRoute.put("/reset-password/:token", TeamControllers.resetPassword);
TeamRoute.get("/logged-user", TeamControllers.getUser);
TeamRoute.put("/toogle-admin/:id", TeamControllers.toggleAdmin);
TeamRoute.put("/leave/:id", checkLocation(allowedLocation, 100), TeamControllers.leave);
TeamRoute.put("/comment/:id", TeamControllers.addComment);
TeamRoute.put("/comment/:id", TeamControllers.addComment);
TeamRoute.put("/toogle-attendance/:id", TeamControllers.switchAttend);
TeamRoute.put("/toogle-active/:id", TeamControllers.activateMember);
