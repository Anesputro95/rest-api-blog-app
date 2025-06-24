import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma"
import { count } from "console";
import { verify } from "jsonwebtoken"


export const listDataArticle = async (req: Request, res: Response) => {
    try {
        const article = await prisma.article.findMany({
            include: {
                ArticleCategory: {
                    select: {
                        category_name: true
                    }
                },
            }
        });

        console.log(article);

        res.status(200).send({
            success: true,
            message: "Article di dapatkan",
            data: article
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal memuat Article"
        });
    }
}

export const detailArticle = async (req: Request, res: Response) => {
    try {
        const filterCategory: any = req.query.filterArticle as string;

        const selectArticle = await prisma.article.findMany({
            where: {
                ArticleCategory: {
                    category_name: filterCategory,
                },
            },
            include: {
                ArticleCategory: {
                    select: {
                        category_name: true
                    }
                }
            }
        })
        console.log(selectArticle);

        res.status(200).send({
            success: true,
            message: "Article di dapatkan",
            data: selectArticle
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal memuat Article"
        });
    }
}

export const addArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.header("Authorization"));

        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            throw {
                rc: 404, message: "Token is not Exist"
            }
        }

        const checkToken: any = verify(token, process.env.TOKEN_KEY || "secret;")

        console.log("DEBUG req.body:", req.body);

        const newArticle = await prisma.article.create({
            data: {
                ...req.body, accountId: checkToken.id
            }
        })
        console.log("hasil dari article", newArticle);

        res.status(201).send({
            success: true,
            message: "Article berhasil dibuat",
            data: newArticle
        })

    } catch (error) {
        next(error)
    }
}

export const updateArticle = async (req: Request, res: Response) => {
    try {
        const { title, content, thumbnail, articleCategoryId } = req.body

        const updArticle = await prisma.article.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                title,
                content,
                thumbnail,
                articleCategoryId,
            },
            include: {
                ArticleCategory: {

                    select: {
                        category_name: true,
                    }
                }
            }
        })
        console.log(updArticle);

        res.status(201).send({
            success: true,
            message: "Berhasil di update",
            data: updArticle
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal update Article"
        });
    }

}

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        await prisma.article.delete({
            where: {
                id: parseInt(req.params.id)
            },
        })

        res.status(200).send({
            success: true,
            message: "Article berhasil dihapus"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal Hapus article"
        });
    }
}