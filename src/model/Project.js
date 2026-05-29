import pl from '../db/pool.js'

class Project {
    static async getProjects() {
        const query = "SELECT * FROM Project";
        const result = await pl.query(query);
        return result.rows;
    }

    static async addProject(title, description, tech_stack, link) {
        const query = "INSERT INTO Project (title, description, tech_stack, link) VALUES ($1, $2, $3, $4) RETURNING *";
        const result = await pl.query(query, [title, description, tech_stack, link]);
        return result.rows[0];
    }
}

export default Project;