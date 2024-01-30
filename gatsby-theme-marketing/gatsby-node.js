exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-proposal-decorators`,
    options: {
      legacy: true
    }
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
      plugins: []
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
  if (page.path === `/explore`) {
    page.matchPath = `/explore/*`
    createPage(page)
  }

  if (page.path === `/preflight`) {
    page.matchPath = `/preflight/*`
    createPage(page)
  }

  if (page.path === `/support-bundle`) {
    page.matchPath = `/support-bundle/*`
    createPage(page)
  }
}
