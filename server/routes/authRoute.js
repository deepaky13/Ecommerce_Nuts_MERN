import { Router } from "express";
import {
  adminLogin,
  logout,
  userLogin,
  userRegister,
} from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";

const router = Router();
// router.use(authenticateUser);
router.post("/register", userRegister);
router.post("/login", authenticateUser, userLogin);
router.post("/login-admin", authenticateUser, adminLogin);
router.post("/logout", logout);

export default router;
