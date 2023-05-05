const {
    postUrl,
    getAllUrls,
    createTable,
    filterUrlToRedirect,
} = require('./controllers')
const { validateUrl, validateTinyUrlParam } = require('./middleware')
const express = require('express')
const app = express()
const cors = require('cors')

const port = 3000

createTable()

app.use(express.json())
app.use(
    cors({
        origin: '*',
    })
)

app.post('/api/create', validateUrl, postUrl)
app.get('/api/list', getAllUrls)
app.get('/api/:tinyUrl', validateTinyUrlParam, filterUrlToRedirect)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
