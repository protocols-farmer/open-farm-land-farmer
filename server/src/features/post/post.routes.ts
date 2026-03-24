//src/features/post/post.routes.ts

import { Router } from "express";
import { postController } from "@/features/post/post.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.js";
import {
  createPostSchema,
  updatePostSchema,
} from "@/features/post/post.validation.js";
import { uploadImage } from "@/middleware/multer.config.js";

const router: Router = Router();

// public routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);

// protected routes
router.post(
  "/",
  verifyToken,
  uploadImage.array("postImages", 5),
  validate(createPostSchema),
  postController.createPost,
);

router.patch(
  "/:id",
  verifyToken,
  uploadImage.array("postImages", 5),
  validate(updatePostSchema),
  postController.updatePost,
);

router.delete("/:id", verifyToken, postController.deletePost);

router.post("/:id/like", verifyToken, postController.likePost);
router.delete("/:id/like", verifyToken, postController.unlikePost);

router.post("/:id/save", verifyToken, postController.savePost);
router.delete("/:id/save", verifyToken, postController.unsavePost);

router.post("/:id/share", verifyToken, postController.sharePost);

router.post("/:id/view", verifyToken, postController.recordPostView);

export default router;
