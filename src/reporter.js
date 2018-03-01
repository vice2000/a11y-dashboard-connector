exports = module.exports = {}

exports.supports = '^5.0.0'

// Called with the results of a test run
exports.results = results => {
  return {
    errorCount: results.issues.filter(issue => issue.type === 'error').length,
    warningCount: results.issues.filter(issue => issue.type === 'warning').length,
    noticeCount: results.issues.filter(issue => issue.type === 'notice').length
  }
}

// begin(); // Called when pa11y starts
// error(message); // Called when a technical error is reported
// debug(message); // Called when a debug message is reported
// info(message); // Called when an information message is reported
