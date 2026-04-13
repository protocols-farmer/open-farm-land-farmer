//src/features/comments/comment.routes.ts
import { Router } from "express";
import { commentController } from "./comment.controller.js";
import {
  verifyToken,
  optionalVerifyToken,
} from "../../middleware/auth.middleware.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();
router.use(apiLimiter);

router.get(
  "/posts/:postId/comments",
  optionalVerifyToken,
  commentController.getCommentsForPost,
);
router.get(
  "/comments/:parentId/replies",
  optionalVerifyToken,
  commentController.getRepliesForComment,
);

router.post(
  "/posts/:postId/comments",
  verifyToken,
  commentController.createCommentOnPost,
);
router.post(
  "/comments/:commentId/replies",
  verifyToken,
  commentController.replyToComment,
);

// Update and delete a specific comment
router.patch(
  "/comments/:commentId",
  verifyToken,
  commentController.updateComment,
);
router.delete(
  "/comments/:commentId",
  verifyToken,
  commentController.deleteComment,
);

// React to a comment
router.post(
  "/comments/:commentId/react",
  verifyToken,
  commentController.toggleCommentReaction,
);

export default router;
