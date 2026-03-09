//src/features/comments/comment.routes.ts
import { Router } from "express";
import { commentController } from "./comment.controller.js";
import {
  verifyToken,
  optionalVerifyToken,
} from "../../middleware/auth.middleware.js"; // 🚜 UPDATED

const router: Router = Router();

// --- PUBLIC (USER-AWARE) ROUTES ---
// 🚜 Applied optionalVerifyToken to allow guest access without 401
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

// --- PROTECTED ROUTES ---
// Create comments and replies
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
