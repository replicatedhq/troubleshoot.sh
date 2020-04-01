const mapPagesUrls = {
  index: '/explore',
}

module.exports = {
  siteMetadata: {
    title: "Troubleshoot.sh"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        useResolveUrlLoader: true,
        cssLoaderOptions: {
          camelCase: false,
        }
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/spec/*`] },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
        languages: ['en'],   
        // Fields to index. If store === true value will be stored in index file. 
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'description', store: true },
          { name: 'content', store: true },
          { name: 'url', store: true },
        ],
        filename: 'specs.json',
      },
    },
  ],
}