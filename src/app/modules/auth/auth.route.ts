import { Router } from "express";
import { LoginValidationSchema, userValidationSchema } from "./auth.validation.js";
import { validateRequest } from "../../middleware/validateSchema.js";
import { AuthController } from "./auth.controller.js";


const router: Router = Router();

router.post("/login", validateRequest(LoginValidationSchema), AuthController.login);

router.post(
  "/register",
  validateRequest(userValidationSchema),
  AuthController.register,
);
router.post('/verify-email', AuthController.verifyEmail);


router.get("/getAllUsers", AuthController.getAllUseres)

export const AuthRouter = router;
