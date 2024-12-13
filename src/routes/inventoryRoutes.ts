import { Router } from "express";
import { inventoryControllers } from "../controllers/inventoryControllers";

export const  inventoryRouter= Router()
inventoryRouter.get('/',inventoryControllers.getAllInventory)
inventoryRouter.get('/rent',inventoryControllers.getAllInventoryRent)
inventoryRouter.get('/category',inventoryControllers.getCategory)
inventoryRouter.get('/:id',inventoryControllers.getInventoryById)
inventoryRouter.post('/',inventoryControllers.newMaterial)
inventoryRouter.post('/category',inventoryControllers.newCategory)
inventoryRouter.put('/:id',inventoryControllers.updateInventory)
inventoryRouter.post("/rent", inventoryControllers.rentItems);
inventoryRouter.put('/:id',inventoryControllers.returnMaterial)
inventoryRouter.delete('/:id',inventoryControllers.deleteInventory)
