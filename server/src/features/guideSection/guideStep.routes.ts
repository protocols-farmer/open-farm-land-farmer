import { Router } from "express";
import { guideStepController } from "./guideStep.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { isVerified } from "@/middleware/isVerified.js";
import { validate } from "@/middleware/validate.js";
import {
  createGuideStepSchema,
  updateGuideStepSchema,
} from "./guideStep.validation.js";

const router: Router = Router();

router.post(
  "/posts/:postId/steps",
  verifyToken,
  isVerified,
  validate(createGuideStepSchema),
  guideStepController.create,
);

router.put(
  "/steps/:stepId",
  verifyToken,
  isVerified,
  validate(updateGuideStepSchema),
  guideStepController.update,
);

router.delete(
  "/steps/:stepId",
  verifyToken,
  isVerified,
  guideStepController.delete,
);

export default router;
