import { model, Schema } from "mongoose";
import { PermissionTypes } from "../types/Types";


const PermissionSchema = new Schema<PermissionTypes>(
  {
    feature: { type: Schema.Types.ObjectId, required: true, ref: "Feature",default:"" },
    permission: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Permission = model<PermissionTypes>("Permission", PermissionSchema);
export default Permission;
