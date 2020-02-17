require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});
module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-eslint",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `Vicelog`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    }
  ]
};
