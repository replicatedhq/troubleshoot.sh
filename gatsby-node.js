const path = require('path');

// Marketing theme gatsby-node functionality
// Note: @babel/plugin-proposal-decorators is configured in .babelrc to avoid duplication

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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Create slug field for both Markdown and MDX nodes
  if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    const slug = createSlugFromPath(fileNode.relativePath)
    
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  // Query for both Markdown and MDX files
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create pages for Markdown files
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/docs.js'),
      context: {
        id: node.id,
      },
    })
  })

  // Create pages for MDX files
  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: `${path.resolve('./src/templates/docs.js')}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Make the front page match everything client side for marketing pages
  
  if (page.path === `/preflight`) {
    page.matchPath = `/preflight/*`
    createPage(page)
  }

  if (page.path === `/support-bundle`) {
    page.matchPath = `/support-bundle/*`
    createPage(page)
  }

  if (page.path === `/explore`) {
    page.matchPath = `/explore/*`
    createPage(page)
  }
};

// Helper function to create slug from file path
function createSlugFromPath(relativePath) {
  // Remove file extension and content/docs prefix
  let slug = relativePath
    .replace(/\.mdx?$/, '')
    .replace(/^content\/docs\//, '')
  
  // Handle index files
  if (slug.endsWith('/index')) {
    slug = slug.replace('/index', '/')
  } else if (slug === 'index') {
    slug = '/'
  }
  
  // Ensure it starts with /docs/
  if (!slug.startsWith('/')) {
    slug = '/' + slug
  }
  
  if (!slug.startsWith('/docs/')) {
    slug = '/docs' + slug
  }
  
  return slug
} 