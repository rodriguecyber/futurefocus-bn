import { Request, Response } from "express";
import { IMaterialRent, Inventory, Material, MaterialRent } from "../models/Materials";

export class inventoryControllers {
  static newCategory = async (req: Request, res: Response) => {
    const data = req.body;
    try {
      await Inventory.create(data);
      res.status(200).json({ message: "suscesfuly added category" });

    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  };
  static newMaterial = async (req: Request, res: Response) => {
    const data = req.body;
    try {
      await Material.create(data);
      res.status(200).json({ message: "suucesfuly added item" }); 

    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "internal server error" });
    }
  };
  static rentItems = async (req: Request, res: Response) => {

    const items:IMaterialRent[] = req.body.items
    const { returnDate, cost, render, rendeeName } = req.body;  

    // const {materialId} = req.params; 
    try {
  for (const item of items) {
    await MaterialRent.create({
      //@ts-expect-error rrr
      materialId: item._id,
      amount: item.amount,
      returnDate: returnDate,
      rendeeName,
      render,
      cost,
    });
    await Material.findByIdAndUpdate(item.materialId, { $inc: { rent: item.amount } });
  }
  res.status(200).json({ message: "successfully rented item" });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "internal server error" });
}
  }
  static returnMaterial = async (req: Request, res: Response) => {
    const {receiver} = req.body;  
    const {id} = req.params;
    try {
    const material=  await MaterialRent.findByIdAndUpdate(id, {
        returnedDate: new Date(),
        returned: true,
        receiver,  
      });
      if(!material){
        return res.status(400).json({message:"no Rent found"})  
      }
  await Material.findByIdAndUpdate(material.materialId,{$inc: {rent: -material.amount }});
   

      res.status(200).json({ message: "suucesfuly returned item" });    

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" });
    }
  };
  static getAllInventory = async (req: Request, res: Response) => {
    try {
      const inventories = await Material.find().populate('category')
      res.status(200).json(inventories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error)
    }
  };
  static getAllInventoryRent = async (req: Request, res: Response) => {
    try {
      const rent = await MaterialRent.find().populate('materialId').populate('render').populate('receiver')
      res.status(200).json(rent);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error)
    }
  };
  static getCategory = async (req: Request, res: Response) => {
    try {
      const inventories = await Inventory.find()
      res.status(200).json(inventories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error)
    }
  };

  static getInventoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const inventory = await Material.findById(id).populate('category');
      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static updateInventory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedInventory = await Material.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedInventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }
      res.status(200).json(updatedInventory);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static deleteInventory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedInventory = await Inventory.findByIdAndDelete(id);
      if (!deletedInventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }
      res.status(200).json({ message: "Inventory deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

