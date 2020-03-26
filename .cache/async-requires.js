// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-docs-template-js": () => import("./../src/templates/DocsTemplate.js" /* webpackChunkName: "component---src-templates-docs-template-js" */),
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-docs-js": () => import("./../src/pages/docs.js" /* webpackChunkName: "component---src-pages-docs-js" */),
  "component---src-pages-explore-js": () => import("./../src/pages/explore.js" /* webpackChunkName: "component---src-pages-explore-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-spec-js": () => import("./../src/pages/spec.js" /* webpackChunkName: "component---src-pages-spec-js" */)
}

