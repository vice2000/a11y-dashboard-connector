'use strict';

var typeStarts = {
	error: '__Error:__ ',
	notice: '__Notice:__ ',
	unknown: '',
	warning: '__Warning:__ '
};

module.exports = {
	begin: dummyFunction,
	error: reportError,
	debug: dummyFunction,
	info: dummyFunction,
	results: reportResults,
	process: buildStats
};

function dummyFunction() {}

function reportError(message) {
	console.error(message);
}

function reportResults(results, url) {
	console.log(buildMarkdown(results, url));
}

function buildStats(results, url) {
	var totalErrors = results.filter(isError).length;
	var totalNotices = results.filter(isNotice).length;
	var totalWarnings = results.filter(isWarning).length;

	var stats = [
		'## Stats for ' + url + ':',
		'* ' + totalErrors + ' Errors',
		'* ' + totalWarnings + ' Warnings',
		'* ' + totalNotices + ' Notices'
	].join('\n') + '\n';

	console.log(stats)
	return stats
}

function isError(result) {
	return (result.type === 'error');
}

function isNotice(result) {
	return (result.type === 'notice');
}

function isWarning(result) {
	return (result.type === 'warning');
}
