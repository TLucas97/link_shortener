const openDb = require('../connect.js')

class Repository {
    constructor(table) {
        this.table = table
    }

    async createTable() {
        const db = await openDb()
        await db.exec(this.table)
    }

    async getAllUrlsFromDB() {
        const db = await openDb()
        const result = await db.all('SELECT * FROM tiny_urls')

        return result
    }

    async filterUrlsFromDB(tinyUrl) {
        const db = await openDb()
        const result = await db.get(
            'SELECT * FROM tiny_urls WHERE tiny_url = ?',
            tinyUrl
        )

        return result
    }

    async insertUrlOnDb(urlBody) {
        const db = await openDb()
        await db.run(
            'INSERT INTO tiny_urls (url, tiny_url, timestamp) VALUES (?, ?, ?)',
            urlBody.url,
            urlBody.tinyUrl,
            urlBody.timestamp
        )
    }
}

module.exports = Repository
