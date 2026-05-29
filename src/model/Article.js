import pl from '../db/pool.js'


class Article {
    static async getArticles() {
        const query = "select * from Article"
        const result = await pl.query(query)
        return result.rows;
    }

    static async getArticleById(id) {
        const query = "SELECT * FROM Article WHERE id = $1";
        const result = await pl.query(query, [id]);
        return result.rows[0]; // Return the single row
    }

    static async addArticle(title, body) {
        const query = "insert into Article (title, body) VALUES ($1, $2) RETURNING *"
        const result = await pl.query(query, [title, body]);
        return result;
    }
}

export default Article;