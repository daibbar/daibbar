import pl from './pool.js'


const createArticlesTable = "CREATE TABLE IF NOT EXISTS Article (id SERIAL PRIMARY KEY, title TEXT, body TEXT)";
const insertArticle = "INSERT INTO Article (title, body) VALUES ('First Article', 'Hello world! This is the first article.')";

const createProjectsTable = "CREATE TABLE IF NOT EXISTS Project (id SERIAL PRIMARY KEY, title TEXT, description TEXT, tech_stack TEXT, link TEXT)";
const insertProject = "INSERT INTO Project (title, description, tech_stack, link) VALUES ('daibbar blog', 'A minimal blogging engine.', 'Node.js, Express, PostgreSQL', 'https://github.com/daibbar')";

try {
    await pl.query(createArticlesTable);
    console.log("Article table created successfully!");
    
    await pl.query(createProjectsTable);
    console.log("Project table created successfully!");

    await pl.query(insertArticle);
    console.log("Article seeded!");
    
    await pl.query(insertProject);
    console.log("Project seeded!");
}
catch (error) {  
    console.error("Database error occurred:", error);
}
finally {
    pl.end(); // close pool connection
}