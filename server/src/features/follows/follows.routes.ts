//src/features/follows/follows.routes.ts
import { Router } from "express";
import { followsController } from "./follows.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();
router.use(apiLimiter);

// Follow Actions (Protected)
router.post("/:userId/follow", verifyToken, followsController.follow);
router.delete("/:userId/unfollow", verifyToken, followsController.unfollow);

// Follow Lists (Protected)
router.get("/:userId/followers", verifyToken, followsController.getFollowers);
router.get("/:userId/following", verifyToken, followsController.getFollowing);

export default router;
