const tinyurl = require('tinyurl')

class URL {
    constructor(url, url_list) {
        this.url = url
        this.url_list = url_list
    }

    async getTinyUrl() {
      console.log(this.url)
        const tinyUrl = await tinyurl.shorten(this.url)
        return tinyUrl
    }

    async getAllTinyUrls() {
        return this.url_list
    }
}

module.exports = URL
