const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-docs-template-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/templates/DocsTemplate.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/.cache/dev-404-page.js"))),
  "component---src-pages-docs-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/docs.js"))),
  "component---src-pages-explore-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/explore.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/index.js"))),
  "component---src-pages-spec-js": hot(preferDefault(require("/Users/jelenagruica/Desktop/troubleshoot.sh/src/pages/spec.js")))
}

