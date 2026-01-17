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
router.use(verifyToken); // All routes require authentication

// Create a new journey update for a specific post
router.post(
  "/posts/:postId/journey",
  uploadImage.single("image"), // Expect a single file with field name "image"
  validate(createProjectUpdateSchema),
  projectUpdateController.create
);

// We use a different base path for updating/deleting to make it simpler
router.put(
  "/journey/:updateId",
  uploadImage.single("image"),
  validate(updateProjectUpdateSchema),
  projectUpdateController.update
);

router.delete("/journey/:updateId", projectUpdateController.delete);

export default router;
