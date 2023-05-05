const openDb = require('../connect.js')
const { customAlphabet } = require('nanoid')
const { extractDomainName } = require('../utils')

const PORT = process.env.PORT || 3000

const createTable = async () => {
    const db = await openDb()
    await db.exec(
        'CREATE TABLE IF NOT EXISTS tiny_urls (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL, tiny_url TEXT NOT NULL, timestamp TEXT NOT NULL)'
    )
}

const insertUrl = async (urlBody) => {
    const db = await openDb()
    await db.run(
        'INSERT INTO tiny_urls (url, tiny_url, timestamp) VALUES (?, ?, ?)',
        [urlBody.url, urlBody.tinyUrl, urlBody.timestamp]
    )
}

const postUrl = async (req, res) => {
    const url = req.body.url

    const nanoid = customAlphabet('1234567890abcdef', 10)
    const result = nanoid(5)
    const hostname = req.hostname

    const urlBody = {
        url,
        tinyUrl: result,
        timestamp: new Date().toISOString(),
    }

    await insertUrl(urlBody)

    res.json({
        status: 200,
        tinyUrl: `${hostname}/api/${result}`,
    })
}

const filterUrlToRedirect = async (req, res) => {
    const tinyUrl = req.params.tinyUrl

    if (!tinyUrl) res.status(404).send('Given url is not found')

    const db = await openDb()
    const result = await db.get(
        'SELECT * FROM tiny_urls WHERE tiny_url = ?',
        tinyUrl
    )

    if (!result) {
        res.json({
            status: 404,
            message: 'Given url is not found',
        })
        return
    }

    res.redirect(result.url)
}

const getAllUrls = async (req, res) => {
    const db = await openDb()
    const result = await db.all('SELECT * FROM tiny_urls')
    const hostname = req.hostname

    const listWithDomainName = result.map((item) => {
        const domainName = extractDomainName(item.url)

        return {
            id: item.id,
            url: item.url,
            tinyUrl: item.tiny_url,
            timestamp: item.timestamp,
            redirectUrl: `${hostname}/api/${item.tiny_url}`,
            name: domainName,
        }
    })
    res.json(listWithDomainName)
}

module.exports = { postUrl, getAllUrls, createTable, filterUrlToRedirect }
