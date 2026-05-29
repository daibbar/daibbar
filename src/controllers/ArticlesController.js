import pl from "../db/pool.js"
import Article  from "../model/Article.js";




export async function getArticles(_, res) {
    try {
        const result = await Article.getArticles();
        res.render("index", {articles: result});
    }
    catch (error) 
    {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Internal Server Error" });}
}

export async function getArticleById(req, res) {
    try {
        const id = req.params.id;
        const article = await Article.getArticleById(id);
        
        if (!article) {
            return res.status(404).send('Article not found');
        }
        
        res.render("article", { article: article });
    }
    catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}