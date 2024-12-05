import { Router } from "express";
import { userRoutes } from "../modules/user/user-routes";

const router = Router();
router.use("/v1", userRoutes);

export default router;
