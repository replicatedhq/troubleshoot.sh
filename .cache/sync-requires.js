const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/index.js"))),
  "component---src-pages-spec-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/spec.js"))),
  "component---src-pages-explore-spec-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/explore-spec.js")))
}

