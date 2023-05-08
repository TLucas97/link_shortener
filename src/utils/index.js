const { customAlphabet } = require('nanoid')

class Helpers {
    constructor() {
        this.nanoid = customAlphabet('1234567890abcdef', 10)
    }

    async createNanoid(url) {
        const domainName = this.getDomainName(url)
        const nanoid = this.nanoid(5)
        return `${domainName}_${nanoid}`
    }

    getDomainName(url) {
        let domainName = ''
        if (url.includes('www.')) {
            domainName = url.split('www.')[1].split(/\.com|\.io/)[0]
        } else {
            domainName = url.split('://')[1].split(/\.com|\.io/)[0]
        }
        return domainName
    }
}

module.exports = Helpers
