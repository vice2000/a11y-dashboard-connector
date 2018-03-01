const run = require('./src/main')
const async = require('async')

const URLS_TO_TEST = {
  'spiegel-de': [
    'http://www.spiegel.de/',
    'http://www.spiegel.de/politik/deutschland/steinmeier-empfaengt-schulz-merkels-hoffnungstraeger-a-1179786.html',
    'http://www.spiegel.de/politik/'
  ],
  'welt-de': [
    'https://www.welt.de/',
    'https://www.welt.de/politik/deutschland/article170905545/Doppelspitze-der-Alphatiere.html',
    'https://www.welt.de/politik/'
  ],
  'zeit-de': [
    'http://www.zeit.de/',
    'http://www.zeit.de/politik/deutschland/2017-11/horst-seehofer-angela-merkel-erzwungene-ruecktritte',
    'http://www.zeit.de/politik/index'
  ]/*,
  'sz-de': [
    'http://www.sueddeutsche.de/',
    'http://www.sueddeutsche.de/politik/regierungskoalition-als-ausweg-bleibt-nur-die-minderheitsregierung-1.3758568',
    'http://www.sueddeutsche.de/politik'
  ],
  'faz-net': [
    'http://www.faz.net/',
    'http://www.faz.net/aktuell/politik/inland/csu-chef-seehofer-kaempft-um-parteispitze-15306777.html',
    'http://www.faz.net/aktuell/politik/'
  ] */
}

console.log('Starting Pa11y tests')

const concurrency = 3 // How many tests to run concurrently
let testQueue = async.queue((url, done) => {
  // Queue the pa11y tests
  console.log(`running ${url}`)
  run(url).then(() => {
    done(url)
  })
}, concurrency)

testQueue.drain = () => {
  console.log('All tests finished.')
}

for (let siteKey in URLS_TO_TEST) {
  // Run the tests asynchronously
  // console.log(`Outer loop ${siteKey}`)
  for (let urlIndex in URLS_TO_TEST[siteKey]) {
    // console.log(`Inner loop ${urlIndex}`)
    console.log(`push ${URLS_TO_TEST[siteKey][urlIndex]}`)
    testQueue.push(URLS_TO_TEST[siteKey][urlIndex], (url) => {
      console.log(`Tested ${url}`)
    })
  }
}

// run()
