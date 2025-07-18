const path = require('path');

// Marketing theme gatsby-node functionality
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
  
  if (page.path === `/preflight`) {
    page.matchPath = `/preflight/*`
    createPage(page)
  }

  if (page.path === `/support-bundle`) {
    page.matchPath = `/support-bundle/*`
    createPage(page)
  }
}

// Docs functionality (markdown only for now)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query for both markdown and MDX docs content
  const docsResult = await graphql(`
    query {
      allFile(filter: { 
        sourceInstanceName: { eq: "docs-content" }, 
        extension: { in: ["md", "mdx"] } 
      }) {
        nodes {
          relativePath
          absolutePath
          extension
          childMarkdownRemark {
            frontmatter {
              title
            }
          }
          childMdx {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (docsResult.errors) {
    console.error('Error querying docs content:', docsResult.errors);
    return;
  }

  // Create docs pages for both markdown and MDX files
  docsResult.data.allFile.nodes.forEach((node) => {
    const { relativePath, absolutePath, extension } = node;
    const slug = relativePath.replace(/\.(md|mdx)$/, '');
    
    createPage({
      path: `/docs/${slug}`,
      component: path.resolve('./src/components/DocsTemplate.js'),
      context: {
        slug,
        relativePath,
        absolutePath,
        extension,
      },
    });
  });
}; 