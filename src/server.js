import express from 'express'


const app = express()
app.use(express.json())

app.use(express.static(".public"))


// app.get('/', (req, res) => {
//   res.send('Blog qui marche bien')
// })


app.use((req, res) => res.status(404).send('Route existe pas'))

// Le serveur démarre en dernier
app.listen(3000, () => console.log('http://localhost:3000'))