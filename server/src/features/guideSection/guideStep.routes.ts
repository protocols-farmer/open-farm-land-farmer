//src/features/guideSection/guideStep.routes.ts
import { Router } from "express";
import { guideStepController } from "./guideStep.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.js";
import {
  createGuideStepSchema,
  updateGuideStepSchema,
} from "./guideStep.validation.js";

const router: Router = Router();

router.post(
  "/posts/:postId/steps",
  verifyToken,
  validate(createGuideStepSchema),
  guideStepController.create,
);
router.put(
  "/steps/:stepId",
  verifyToken,
  validate(updateGuideStepSchema),
  guideStepController.update,
);
router.delete("/steps/:stepId", verifyToken, guideStepController.delete);

export default router;
