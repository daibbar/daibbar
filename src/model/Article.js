import pl from '../db/pool.js'


class Article {
    static async getArticles() {
        const query = "select * from Article"
        const result = await pl.query(query)
        return result.rows;
    }

    static async addArticle(title, content) {
        const query = "insert into Article (title, content) VALUES ($1, $2) RETURNING *"
        const result = await pl.query(query, [title, content]);
        return result;
    }
}

export default Article;