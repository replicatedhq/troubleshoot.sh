const gatsbyConfig = require(`gatsby-config`)
module.exports = gatsbyConfig({
  siteMetadata: {
    title: "Troubleshoot.sh"
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: '../gatsby-theme-marketing',
    },
  ],
});
