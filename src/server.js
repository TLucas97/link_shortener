const UrlController = require('./controllers')
const UrlMiddleware = require('./middleware')
const Repository = require('./models/repository')
const express = require('express')
const app = express()
const cors = require('cors')

const repository = new Repository(
    'CREATE TABLE IF NOT EXISTS tiny_urls (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL, tiny_url TEXT NOT NULL, timestamp TEXT NOT NULL)'
)
const { postUrl, getAllUrls, getRedirectUrl } = new UrlController()
const { validateUrl, validateTinyUrlParam } = new UrlMiddleware()
const port = process.env.PORT || 3000

repository.createTable()

app.use(express.json())
app.use(
    cors({
        origin: '*',
    })
)

app.post('/api/create', validateUrl, postUrl)
app.get('/api/list', getAllUrls)
app.get('/api/:tinyUrl', validateTinyUrlParam, getRedirectUrl)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
