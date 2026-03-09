-- CreateIndex
CREATE INDEX "comment_user_reactions_commentId_idx" ON "comment_user_reactions"("commentId");

-- CreateIndex
CREATE INDEX "comments_authorId_idx" ON "comments"("authorId");

-- CreateIndex
CREATE INDEX "follows_followingId_idx" ON "follows"("followingId");

-- CreateIndex
CREATE INDEX "opportunity_tags_tagId_idx" ON "opportunity_tags"("tagId");

-- CreateIndex
CREATE INDEX "post_likes_postId_idx" ON "post_likes"("postId");

-- CreateIndex
CREATE INDEX "post_saves_postId_idx" ON "post_saves"("postId");

-- CreateIndex
CREATE INDEX "post_tags_tagId_idx" ON "post_tags"("tagId");
