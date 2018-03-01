const pa11y = require('pa11y')
const async = require('async')
const fs = require('fs')
const graphite = require('graphite')

const reporter = require('./reporter')

function run () {
  pa11y('http://www.zeit.de/index', {
    includeNotices: true,
    includeWarnings: true
  }).then(results => {
    const processedResults = reporter.results(results)

    saveRawData(results)
    sendStats(processedResults)
  }).catch(err => {
    console.error(err)
  })
}

function saveRawData (data) {
  fs.writeFileSync('report.json', JSON.stringify(data, null, 4) + '\n')
}

function sendStats (results) {
  console.log(results)

  const client = graphite.createClient('plaintext://sitespeed.zeit.de:2003/')

  const metrics = {
    test: {
      a11y: {
        zeit: {
          results
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

module.exports = run
