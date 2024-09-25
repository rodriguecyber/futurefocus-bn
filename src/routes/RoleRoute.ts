import { Router } from "express";
import { PermissionCointroller } from "../controllers/PermissionController";

export const RoleRouter= Router()
RoleRouter.post('/',PermissionCointroller.AddRole)
RoleRouter.put('/:roleId',PermissionCointroller.assignPermisson)
RoleRouter.get('/',PermissionCointroller.viewRole)
RoleRouter.post('/permission',PermissionCointroller.AddPermission)
RoleRouter.get('/permission',PermissionCointroller.ViewPermission)
RoleRouter.post('/feature',PermissionCointroller.AddFeature)
RoleRouter.get('/feature',PermissionCointroller.ViewFeature)