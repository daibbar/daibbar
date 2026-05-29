import express from 'express'
import articleRouter from './routes/articles.js'
import projectsRouter from './routes/projects.js'
import 'dotenv/config'

const app = express()
app.set("view engine", "ejs")
app.set("views", "./src/views")

app.listen(3000, () => console.log('http://localhost:3000'))
app.use(express.json())
app.use(express.static("src/public"))

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/About', (req, res) => {
  res.render('About')
})

app.use('/articles', articleRouter)
app.use('/projects', projectsRouter)

app.use((req, res) => res.status(404).send('Route existe pas'))
// Le serveur démarre en dernier
console.log("Hello depuis mon ordinateur vers Docker !");
