//src/features/github/github.routes.ts

import { Router } from "express";
import { githubController } from "./github.controller.js";

const router: Router = Router();

router.get("/repo-pulse", githubController.getRepoPulse);

export default router;
