const main = require('./src/main')
const async = require('async')

const URLS = {
  'spiegel-de': {
    'homepage': 'http://www.spiegel.de/',
    'article': 'http://www.spiegel.de/politik/deutschland/steinmeier-empfaengt-schulz-merkels-hoffnungstraeger-a-1179786.html',
    'ressort': 'http://www.spiegel.de/politik/'
  },

  'welt-de': {
    'homepage': 'https://www.welt.de/',
    'article': 'https://www.welt.de/politik/deutschland/article170905545/Doppelspitze-der-Alphatiere.html',
    'ressort': 'https://www.welt.de/politik/'
  },
  'zeit-de': {
    'homepage': 'http://www.zeit.de/index',
    'article': 'http://www.zeit.de/politik/deutschland/2017-11/horst-seehofer-angela-merkel-erzwungene-ruecktritte',
    'ressort': 'http://www.zeit.de/politik/index'
  }
}

const pa11yQueue = async.queue((task, cb) => {
  console.log(`Start ${task.url}`)
  main.run(task.site, task.type, task.url).then(() => {
    cb(task.url)
  })
}, 3)

pa11yQueue.drain = () => {
  console.log('All tests finished.')
}

console.log('Starting Pa11y tests')

const doneCallback = (url) => {
  console.log(`Tested ${url}`)
}

for (let site in URLS) {
  for (let type in URLS[site]) {
    pa11yQueue.push({site, type, url: URLS[site][type]}, doneCallback)
  }
}
