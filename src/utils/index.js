const extractDomainName = (url) => {
    let domainName
    if (url.includes('www.')) {
        domainName = url.split('www.')[1].split(/\.com|\.io/)[0]
    } else {
        domainName = url.split('://')[1].split(/\.com|\.io/)[0]
    }
    return domainName
}

module.exports = { extractDomainName }
