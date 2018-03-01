const pa11y = require('pa11y')
const fs = require('fs')
const graphite = require('graphite')

const reporter = require('./reporter')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {
  return pa11y(url, {
    includeNotices: true,
    includeWarnings: true
  }).then(results => {
    const stats = reporter.stats(results)
    const topIssues = reporter.topIssuesPerGuideline(results, 3)

    saveRawData(results, siteName)
    sendStats(siteName, siteType, stats, JSON.stringify([...topIssues]))
  }).catch(err => {
    console.error(err)
  })
}

function saveRawData (data, siteName) {
  fs.writeFileSync('report_' + siteName + '.json', JSON.stringify(data, null, 4) + '\n')
}

function sendStats (siteName, siteType, stats, topIssues) {
  console.log(stats)

  const client = graphite.createClient('plaintext://sitespeed.zeit.de:2003/')

  const metrics = {
    test: {
      a11y: {
        [siteName]: {
          [siteType]: {
            stats,
            topIssues: {
              topIssues
            }
          }
        }
      }
    }
  }

  client.write(metrics, function (error) {
    if (typeof error !== 'undefined') {
      console.error(error)
    }
  })
  client.end()
}
