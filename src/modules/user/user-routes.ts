import express from "express";
import requestValidation from "../../app/middwares/validation-request";
import { userValidation } from "./user-validation";
import { userController } from "./user-controller";
import { authValidation } from "../auth/auth-validation";
import { authController } from "../auth/auth-controller";
import auth from "../../app/middwares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();
router.post(
  "/auth/signup",
  requestValidation(userValidation.createUserValidationSchema),
  userController.createUser
);
router.post(
  "/auth/login",
  requestValidation(authValidation.createAuthValidationSchema),
  authController.createAuth
);

router.get("/single-user/:id", userController.getSingleUser);
router.put(
  "/update-user/:id",
  auth(USER_ROLE.user),
  requestValidation(userValidation.updateUserValidationSchema),
  userController.updateUser
);

export const userRoutes = router;
