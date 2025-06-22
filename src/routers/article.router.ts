import { Router } from "express";
import { addArticle, deleteArticle, detailArticle, listDataArticle, updateArticle } from "../controllers/article.controller";

const router = Router();

router.get("/", listDataArticle)
router.get("/:category_name", detailArticle)
router.post("/", addArticle)
router.patch("/:id", updateArticle)
router.delete("/:id", deleteArticle)

export default router;