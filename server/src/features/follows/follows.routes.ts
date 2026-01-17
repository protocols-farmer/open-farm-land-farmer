import { Router } from "express";
import { followsController } from "./follows.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";

const router: Router = Router();

/**
 * AUTHENTICATION GUARD
 * Users must be logged in to perform any follow-related actions.
 */
router.use(verifyToken);

// Follow Actions
router.post("/:userId/follow", followsController.follow);
router.delete("/:userId/unfollow", followsController.unfollow);

// Follow Lists (Can be used for followers/following modals)
router.get("/:userId/followers", followsController.getFollowers);
router.get("/:userId/following", followsController.getFollowing);

export default router;
