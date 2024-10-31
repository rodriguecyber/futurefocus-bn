import { model, Schema } from "mongoose";

interface IFeature {
  feature: string;
  web:string
}
const FeatureSchema = new Schema<IFeature>(
  {
    feature: {type:String, required:true},
    web: {type:String, required:true, enum:["website","academic-portal"]} 
  },
  {
    timestamps: true,
  }
);
const Feature = model<IFeature>("Feature", FeatureSchema);
export default Feature;
