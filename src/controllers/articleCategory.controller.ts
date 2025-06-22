import { Request, Response } from "express";
import { prisma } from "../config/prisma"

export const addArticleCategory = async (req: Request, res: Response) => {
    try {
        const { category_name } = req.body;

        const newCategory = await prisma.articleCategory.create({
            data: {
                category_name
            }
        });
        console.log("Hasil dari", newCategory);

        res.status(201).send({
            success: true,
            message: "Category berhasil di buat",
            data: newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal membuat Category"
        });
    }

}

export const getArticleCategory = async (req: Request, res: Response) => {
    try {
        const article = await prisma.articleCategory.findMany();

        res.status(200).send(article);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal mengambil data"
        });
    }
}