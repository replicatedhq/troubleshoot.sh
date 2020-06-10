exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === `/`) {
    page.matchPath = `/*`
    createPage(page)
  }
}