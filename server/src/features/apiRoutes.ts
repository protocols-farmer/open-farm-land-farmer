//apiRoutes
import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./user/user.routes.js";
import postRoutes from "./post/post.routes.js";
import tagRoutes from "./tags/tag.routes.js";
import { deserializeUser } from "./post/deserializeUser.js";
import commentRoutes from "./comments/comment.routes.js";
import opportunityRoutes from "./opportunities/opportunity.routes.js";
import updateRoutes from "./updates/update.routes.js";
import projectUpdateRoutes from "./projectUpdate/projectUpdate.routes.js";
import guideSectionRoutes from "../features/guideSection/guideSection.routes.js";
import guideStepRoutes from "../features/guideSection/guideStep.routes.js";
import adminRoutes from "./admin/admin.routes.js";
import followRoutes from "./follows/follows.routes.js";
import notificationRoutes from "./notifications/notifications.routes.js";
import githubRoutes from "./github/github.routes.js";

const router: Router = Router();
router.use(deserializeUser);

router.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "API router is healthy." });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/posts", postRoutes);
router.use("/tags", tagRoutes);
router.use(commentRoutes);
router.use("/opportunities", opportunityRoutes);
router.use("/updates", updateRoutes);
router.use(projectUpdateRoutes);
router.use(guideSectionRoutes);
router.use(guideStepRoutes);
router.use("/admin", adminRoutes);
router.use("/follows", followRoutes);
router.use("/notifications", notificationRoutes);
router.use("/github", githubRoutes); // Add this line
export default router;
