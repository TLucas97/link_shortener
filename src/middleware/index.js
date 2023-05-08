const axios = require('axios')

class UrlMiddleware {
    async validateUrl(req, res, next) {
        const url = req.body.url

        if (!url) {
            res.json({ status: 400, message: 'Url is required' })
            return
        }

        const response = await axios.get(url).catch((error) => {
            res.json({ status: 404, message: 'Url inválida' })
        })

        if (response) next()
    }

    async validateTinyUrlParam(req, res, next) {
        const tinyUrl = req.params.tinyUrl

        if (!tinyUrl) {
            res.status(404).send('Given url is not found')
            return
        }

        next()
    }
}

module.exports = UrlMiddleware
