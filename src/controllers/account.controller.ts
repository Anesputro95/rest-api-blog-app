import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_name, email, password } = req.body;

        const exitingUser = await prisma.account.findUnique({
            where: {
                email: req.body.email,
            }
        })

        if (exitingUser) {
            throw { rc: 400, success: false, message: "Account already exist" }
        }

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
                password: await hashPassword(req.body.password),
            }
        });
        console.log("Hasil new Account", newAccount);

        res.status(201).send({
            success: true,
            message: "Berhasil membuat akun",
            result: newAccount
        });

    } catch (error) {
        next(error);
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

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Email dan Password harus di isi"
            })
        }

        const findUser = await prisma.account.findUnique({
            where: { email }
        })

        if (!findUser) {
            throw { rc: 404, message: "User not exist" };
        }

        const comparePass = await compare(password, findUser.password);
        if (!comparePass) {
            throw { rc: 401, message: "Password is wrong" };
        }

        // membuat token
        // kapan menggunakan token ()
        const token = sign({ id: findUser.id, role: findUser.role },
            process.env.TOKEN_KEY || "secret",
            { expiresIn: "1h" }
        );

        res.status(200).send({
            success: true,
            message: "Berhasil Login",
            data: {
                user_name: findUser.user_name,
                email: findUser.email,
                role: findUser.role,
                token,
            }
        })
    } catch (error) {
        next(error)
    }
}