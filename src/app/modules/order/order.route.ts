import express from "express";
import { OrderController } from "./order.controller.js";

const router = express.Router();

router.post("/create-order", OrderController.createOrder);

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getSingleOrder);


router.patch("/:id/status", OrderController.updateOrderStatus);

export const OrderRoutes = router;