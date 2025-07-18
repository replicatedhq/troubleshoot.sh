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
  // Core functionality
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`],
    },
  },
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