//src/features/projectUpdate/projectUpdate.routes.ts
import { Router } from "express";
import { projectUpdateController } from "./projectUpdate.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.js";
import { uploadImage } from "@/middleware/multer.config.js";
import {
  createProjectUpdateSchema,
  updateProjectUpdateSchema,
} from "./projectUpdate.validation.js";

const router: Router = Router();

router.post(
  "/posts/:postId/journey",
  verifyToken,
  uploadImage.single("image"),
  validate(createProjectUpdateSchema),
  projectUpdateController.create,
);

router.put(
  "/journey/:updateId",
  verifyToken,
  uploadImage.single("image"),
  validate(updateProjectUpdateSchema),
  projectUpdateController.update,
);

router.delete(
  "/journey/:updateId",
  verifyToken,
  projectUpdateController.delete,
);

export default router;
