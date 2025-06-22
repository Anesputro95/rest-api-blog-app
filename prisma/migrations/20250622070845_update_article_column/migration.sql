-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
