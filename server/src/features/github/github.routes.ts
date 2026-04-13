//src/features/github/github.routes.ts
import { Router } from "express";
import { githubController } from "./github.controller.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

router.use(apiLimiter);

router.get("/repo-pulse", githubController.getRepoPulse);

export default router;
