const pa11y = require('pa11y');
const fs = require('fs')

async function run() {
	try {
		const result = await pa11y('http://www.zeit.de/index', {
      includeNotices: true,
      includeWarnings: true,
    });

    const stats = {}

    for (issue of result.issues) {
      const type = issue.type

      if (!(type in stats)) {
        stats[type] = 0;
      }

      stats[type] = stats[type] + 1
    }

    console.log(stats)

    fs.writeFileSync('report.json', JSON.stringify(result, null, 4) + '\n')

	} catch (error) {
		console.error(error.message);
	}
}

run();
