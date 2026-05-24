import pl from './pool.js'


const query = "CREATE TABLE IF NOT EXISTS Article (SERIAL PRIMARY KEY, title TEXT, body TEXT)";
const dumpq = "insert into Article VALUES (1, 'first article', 'hello world!')"


try {
    const res = await pl.query(query);
    console.log("article table created succesfully!")
    const ins = await pl.query(dumpq)
    console.log("dumpq inserted!")
}

catch (error) {  
    console.error("Database error occurred:", error);
}