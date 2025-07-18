require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-netlify`,
  // Images for src directory
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src-images`,
      path: `${__dirname}/src/images`
    },
  },
  // Docs content
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `docs-content`,
      path: `${__dirname}/docs/source`,
    },
  },
  // Docs images
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `docs-images`,
      path: `${__dirname}/docs/source/images`,
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
    resolve: "gatsby-plugin-google-fonts",
    options: {
      fonts: [
        "Roboto Mono\:400,500,700",
      ],
      display: "swap"
    }
  },
  // MDX support (only for .mdx files)
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`], // Only process .mdx files
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: `100`,
            icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.65 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            className: `anchor`,
            maintainCase: true,
            removeAccents: true,
            isIconAfterHeader: true,
            elements: [`h1`, `h2`, `h3`, `h4`],
          },
        },
      ],
    },
  },
  // Core functionality
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
];

// Only add Google Analytics if tracking ID is provided
if (process.env.GA_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GA_TRACKING_ID,
      head: true,
      anonymize: true,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: "Troubleshoot.sh"
  },
  pathPrefix: '/',
  plugins,
} 