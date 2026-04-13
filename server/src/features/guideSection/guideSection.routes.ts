//src/features/guideSection/guideSection.routes.ts
import { Router } from "express";
import { guideSectionController } from "./guideSection.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { isVerified } from "@/middleware/isVerified.js";
import { validate } from "@/middleware/validate.js";
import { uploadImage } from "@/middleware/multer.config.js";
import {
  createGuideSectionSchema,
  updateGuideSectionSchema,
} from "./guideSection.validation.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

router.use(apiLimiter);

router.post(
  "/steps/:stepId/sections",
  verifyToken,
  isVerified,
  uploadImage.single("image"),
  validate(createGuideSectionSchema),
  guideSectionController.create,
);

router.put(
  "/sections/:sectionId",
  verifyToken,
  isVerified,
  uploadImage.single("image"),
  validate(updateGuideSectionSchema),
  guideSectionController.update,
);

router.delete(
  "/sections/:sectionId",
  verifyToken,
  isVerified,
  guideSectionController.delete,
);

export default router;
