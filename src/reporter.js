exports = module.exports = {}

/**
 * Get the error, notice and warning statistics for a given pa11y result
 *
 * @param {object} The pa11y results
 * @returns {object} Object containing errorCount, warningCount and noticeCount
 */
exports.stats = results => {
  return {
    errorCount: results.issues.filter(issue => issue.type === 'error').length,
    warningCount: results.issues.filter(issue => issue.type === 'warning').length,
    noticeCount: results.issues.filter(issue => issue.type === 'notice').length
  }
}

/**
 * Get the top n guidelines with the most issues (warning, error or notice)
 * for the given pa11y results.
 *
 * @param {object} results The pa11y results
 * @param {number} count Maximum number of guidelines to return
 * @returns {Map} A sorted map of the top n issues
 */
exports.topIssuesPerGuideline = (results, top) => {
  const guidelineMap = new Map()

  results.issues.forEach(issue => {
    // Transform code string to array, for example:
    // Input: 'WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1'
    // Result: [ 'WCAG2AA', 'Principle2', 'Guideline2_4', '2_4_1', 'H64', '1' ]
    const splittedCodes = issue.code.match(/([^.]+)/g)
    const guideline = splittedCodes[2]

    guidelineMap.set(guideline, guidelineMap.get(guideline) + 1 || 1)
  })

  const sortedGuidelines = [...guidelineMap.entries()].sort((a, b) => {
    return a[1] < b[1] // sort by guidline occurence
  })

  return new Map(sortedGuidelines.slice(0, top))
}

/**
 * Get the top n guidelines with the most issues (warning, error or notice)
 * for the given pa11y results.
 *
 * @param {object} results The pa11y results
 * @param {string} issueString Pa11y code of the issue to be counted
 * @returns {Integer} Number of found issues
 */
exports.numberOfSpecificIssue = (results, issueString) => {
  return results.issues.filter(issue => issue.code === issueString).length
}
