import { Request, Response } from "express";
import { Inventory, Material, MaterialRent } from "../models/Materials";

export class inventoryControllers {
  static newCategory = async (req: Request, res: Response) => {
    const data = req.body;
    try {
      await Inventory.create(data);
      res.status(200).json({ message: "suucesfuly added category" });

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
  static rentItem = async (req: Request, res: Response) => {
    const { returnDate, cost, amount, rendeeName, render } = req.body;  
    const {materialId} = req.params;
    try {
      await MaterialRent.create({
        materialId,
        amount,
        returnDate,
        rendeeName,
        render,
        cost
      });
      await Material.findByIdAndUpdate(materialId, { rent: amount });
      res.status(200).json({ message: "suucesfuly rent item" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" });
    }
  };
  static returnMaterial = async (req: Request, res: Response) => {
    const receiverName = req.body;
    const {id} = req.params;
    try {
      await MaterialRent.findByIdAndUpdate(id, {
        returnDate: new Date(),
        returned: true,
        receiverName,
      });
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
      const rent = await MaterialRent.find().populate('materialId')
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

