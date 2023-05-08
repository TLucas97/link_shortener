const Repository = require('../models/repository')
const Helpers = require('../utils')

const helper = new Helpers()
const repository = new Repository()

class UrlController {
    async postUrl(req, res) {
        const url = req.body.url
        const nanoid = await helper.createNanoid(url)

        const urlBody = {
            url,
            tinyUrl: nanoid,
            timestamp: new Date().toISOString(),
        }

        await repository.insertUrlOnDb(urlBody)

        res.json({
            status: 200,
            tinyUrl: nanoid,
        })
    }

    async getAllUrls(req, res) {
        const url_list = await repository.getAllUrlsFromDB()
        const hostname = req.hostname

        const listWithDomainName = url_list.map((item) => {
            const domainName = helper.getDomainName(item.url)

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

    async getRedirectUrl(req, res) {
        const tinyUrl = req.params.tinyUrl

        const filtered_url = await repository.filterUrlsFromDB(tinyUrl)

        if (!filtered_url) {
            res.json({
                status: 404,
                message: 'Given url is not found',
            })
            return
        }

        res.redirect(filtered_url.url)
    }
}

module.exports = UrlController
