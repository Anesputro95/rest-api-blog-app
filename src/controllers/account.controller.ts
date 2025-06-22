import { Request, Response } from "express";
import { prisma } from "../config/prisma";


export const createAccount = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;

        if (!email.includes("@") || !email.includes(".")) {
            res.status(404).send({
                success: false,
                message: "Email tidak valid"
            })
        }

        const newAccount = await prisma.account.create({
            data: {
                user_name,
                email,
                password,
            }
        });
        console.log("Hasil new Account", newAccount);

        res.status(201).send({
            success: true,
            message: "Berhasil membuat akun",
            result: newAccount
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal membuat Akun"
        });
    }
};

export const updateAccount = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;

        if (!email.includes("@") || !email.includes(".")) {
            res.status(404).send({
                success: false,
                message: "Email tidak valid"
            })
        }
        
        const account = await prisma.account.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                user_name,
                email,
                password
            }
        })
        console.log(account);

        res.status(201).send({
            success: true,
            message: "Update Akun Success",
            result: account
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal mengedit akun"
        });
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Email dan Password harus di isi"
            })
        }

        const filterAccount = await prisma.account.findFirst({
            where: { email, password }
        })
        console.log(filterAccount);


        if (!filterAccount) {
            res.status(404).send({
                success: false,
                message: "Email dan Password salah"
            })
        }

        res.status(200).send({
            success: true,
            message: "Berhasil Login",
            data: {
                id: true,
                user_name: filterAccount?.user_name,
                email: filterAccount?.email
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Gagal Sign In"
        });
    }
}