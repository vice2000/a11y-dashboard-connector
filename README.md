# a11y-dashboard-connector
Run competetive Accessibility tests and send them to a Graphite db

## ToDo & Ideas

- Competitive statistics, compare multiple sites (run parallel)
- Use pa11y reporter
- Include article page
- Command Line Interface (params: which sites, graphite url)
- axe for analyses: reports good parse-able advice (Violation of "color-contrast" with 108 occurrences!)
- exclude elements like ads (look for "hide elements" in https://bitsofco.de/pa11y/) ... if this makes sense. Maybe as an extra report: issues with and without ads ?
