import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

const DocsTemplate = ({ data, pageContext }) => {
  const { markdownRemark } = data;
  
  // Handle case where markdown file is not found
  if (!markdownRemark) {
    return (
      <div>
        <Helmet>
          <title>Page Not Found | Troubleshoot Docs</title>
        </Helmet>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          <h1>Page Not Found</h1>
          <p>The requested documentation page could not be found.</p>
          <p>Path: {pageContext.slug}</p>
        </div>
      </div>
    );
  }
  
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      <Helmet>
        <title>{frontmatter.title} | Troubleshoot Docs</title>
      </Helmet>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export const query = graphql`
  query DocsPageQuery($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: {eq: $absolutePath}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default DocsTemplate; 