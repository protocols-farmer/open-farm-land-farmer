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

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);

router.use(verifyToken);

router.post(
  "/",
  uploadImage.array("postImages", 5),
  validate(createPostSchema),
  postController.createPost,
);

router.patch(
  "/:id",
  uploadImage.array("postImages", 5),
  validate(updatePostSchema),
  postController.updatePost,
);

router.delete("/:id", postController.deletePost);

router.post("/:id/like", postController.likePost);
router.delete("/:id/like", postController.unlikePost);

router.post("/:id/save", postController.savePost);
router.delete("/:id/save", postController.unsavePost);

router.post("/:id/share", postController.sharePost);

router.post("/:id/view", postController.recordPostView);

export default router;
