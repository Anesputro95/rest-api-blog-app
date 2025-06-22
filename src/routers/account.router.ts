import { Router } from "express";
import { createAccount, signIn, updateAccount } from "../controllers/account.controller";


const router = Router();
router.post("/", createAccount)
router.put("/:id", updateAccount)
router.post("/signin", signIn)

export default router;