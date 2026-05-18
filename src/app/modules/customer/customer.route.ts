import express from "express";
import { CustomerController } from "./customer.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";


const router = express.Router();


router.get("/my-profile", authMiddleware, CustomerController.getMyProfile);

router.patch("/update-profile", authMiddleware, CustomerController.updateMyProfile);
router.patch("/orders/:id/cancel", authMiddleware, CustomerController.cancelMyOrder);

export const CustomerRoutes = router;