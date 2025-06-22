import dotenv from "dotenv";
dotenv.config();
import accountRouter from "./routers/account.router"
import articleCategoryRouter from "./routers/articleCategory.router"


import express, { Application, Request, Response } from "express";
import articleRouter  from "./routers/article.router";

const PORT: string | number = process.env.PORT || 2500;

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("<h1>Welcome to Blog</h1>")
});

app.use("/account", accountRouter);
app.use("/article", articleRouter);
app.use("/article-category", articleCategoryRouter);

app.listen(PORT, () => {
    console.log(`"Blog API is Running", http://localhost:${PORT}`)
})