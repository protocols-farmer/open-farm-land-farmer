//src/features/user/user.routes.ts
import { Router } from "express";
import { userController } from "@/features/user/user.controller.js";
import {
  verifyToken,
  optionalVerifyToken,
} from "@/middleware/auth.middleware.js";
import { uploadImage } from "@/middleware/multer.config.js";
import { validate } from "@/middleware/validate.js";
import { updateUserProfileSchema } from "@/features/user/user.validation.js";

const router: Router = Router();

router.get(
  "/profile/:username",
  optionalVerifyToken,
  userController.getUserByUsername,
);

router.use(verifyToken);

router.get("/me", userController.getMe);
router.patch(
  "/me",
  uploadImage.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  validate(updateUserProfileSchema),
  userController.updateMyProfile,
);
router.delete("/me", userController.deleteMyAccount);

router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById);

export default router;
