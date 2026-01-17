// server/src/features/github/github.routes.ts

import { Router } from "express";
import { githubController } from "./github.controller.js";

const router: Router = Router();

// We keep this public if you want guests to see repo stats,
// but it's secured by our backend PAT.
router.get("/repo-pulse", githubController.getRepoPulse);

export default router;
