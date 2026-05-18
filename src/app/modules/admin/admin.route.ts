import express from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();



router.get("/customers", AdminController.getAllCustomers);

router.get("/customers/:id", AdminController.getCustomerDetails);


router.patch("/customers/:id/role", AdminController.updateUserRole);
router.patch("/orders/:id/status", AdminController.updateOrderStatus);

export const AdminRoutes = router;