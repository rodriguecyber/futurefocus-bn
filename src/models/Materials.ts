import { model, ObjectId, Schema } from "mongoose";

interface IMaterial {
  materialName: string;
  category: ObjectId;
  amount: number;
  rent: number;
}
interface IMCategory {
  name: String;
}


const MCategorySChema = new Schema<IMCategory>({
  name: { type: String, required: true },
});


export const MCategory = model<IMCategory>("MaterialCategory", MCategorySChema);
const MaterialSchema = new Schema<IMaterial>({
  materialName: { type: String, required: true },
  category: { type: Schema.Types.ObjectId },
  amount: { type: Number, required: true, default: 0 },
  rent: { type: Number, required: true, default: 0 },
});
export const Material = model<IMaterial>("Material", MaterialSchema);
