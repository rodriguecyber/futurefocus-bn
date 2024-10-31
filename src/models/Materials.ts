import { model, ObjectId, Schema } from "mongoose";

interface IMaterial {
  materialName: string;
  category: ObjectId;
  amount: number;
  rent: number;
}
interface IMaterialRent {
  materialId: ObjectId;
  render: ObjectId;
  receiver: ObjectId;
  rendeeName: String; 
  returnDate: Date;
  returnedDate: Date;
  returned:boolean
  amount: number;
  cost: number;
  
}
interface IInventory {
  name: String;
}


const InventorySchema = new Schema<IInventory>({
  name: { type: String, required: true },
});


export const Inventory = model<IInventory>("Inventory", InventorySchema);


const MaterialSchema = new Schema<IMaterial>({
  materialName: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Inventory" },
  amount: { type: Number, required: true, default: 0 },
  rent: { type: Number, required: true, default: 0 },
});
export const Material = model<IMaterial>("Material", MaterialSchema);

const MaterialRentSchema = new Schema<IMaterialRent>({
  materialId: { type: Schema.Types.ObjectId, required: true, ref: "Material" },
  render: { type: Schema.Types.ObjectId, ref: "Team",required:true },
  receiver: { type: Schema.Types.ObjectId, ref: "Team" },
  rendeeName: { type: String, required: true },
  returnDate: { type: Date, required: true },
  returnedDate: { type: Date },
  returned: { type: Boolean, default: false },
  cost: { type: Number, required: true, default: 0 },
  amount: { type: Number, required: true, default: 0 },
});
export const MaterialRent = model<IMaterialRent>("MaterialRent", MaterialRentSchema);
