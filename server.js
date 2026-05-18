import express from 'express'


const app = express()

app.use(express.json())
app.use(express.static("public"))
// Fausse BDD
const articles = [
  { id: 1, titre: 'Premier article', contenu: 'Hello' }
]

// Routes
app.get('/', (req, res) => {
  res.send('Blog qui marche bien')
})

app.set("view engine", "ejs")
app.get('/articles', (req, res) => {
  //res.json(articles)
  res.render("index", {name: "daibbar"})

})

app.post('/articles', (req, res) => {
  const nouvelArticle = { id: Date.now(), ...req.body }
  articles.push(nouvelArticle)
  res.status(201).json(nouvelArticle)
})

// 404 si aucune route match
app.use((req, res) => res.status(404).send('Route existe pas'))

// Le serveur démarre en dernier
app.listen(3000, () => console.log('http://localhost:3000'))