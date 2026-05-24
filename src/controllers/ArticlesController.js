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