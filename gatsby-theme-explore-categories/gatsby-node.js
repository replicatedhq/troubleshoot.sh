exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === `/explore`) {
    page.matchPath = `/explore/*`
    createPage(page)
  }
}