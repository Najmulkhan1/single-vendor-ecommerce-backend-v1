import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route.js";
import { ProductRoutes } from "../modules/product/product.route.js";
import { OrderRoutes } from "../modules/order/order.route.js";
import { CustomerRoutes } from "../modules/customer/customer.route.js";
import { AdminRoutes } from "../modules/admin/admin.route.js";
import { AdminService } from "../modules/admin/admin.service.js";

const router: Router = Router();

const moduleRoutes = [
    { 
        path: "/auth", 
        route: AuthRouter 
    },
    {
        path: '/products',
        route: ProductRoutes
    },
    {
        path: '/order',
        route: OrderRoutes
    },
    {
        path: '/user',
        route: CustomerRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;