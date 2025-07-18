import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";

// Colors and styling from the original docs theme
const colors = {
  primary: "#326DE6",
  text1: "#163166",
  text2: "#4A4A4A",
  text3: "#9B9B9B",
  divider: "#E5E5E5",
  background: "#F8F8F8",
  background2: "#F0F3FA"
};

const StyledContentWrapper = styled.div({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem",
  paddingTop: "1rem"
});

const PageHeader = styled.div({
  marginBottom: "2rem",
  paddingBottom: "1rem",
  borderBottom: `1px solid ${colors.divider}`
});

const Heading = styled.h1({
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: "bold",
  fontSize: "26px",
  lineHeight: "36px",
  color: colors.text1,
  marginBottom: "5px"
});

const BodyContent = styled.div({
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: colors.text2,
  fontSize: "16px",
  lineHeight: "28px",
  
  // Headers
  "h1, h2, h3, h4, h5, h6": {
    color: colors.text1,
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: "bold",
    marginTop: "2rem",
    marginBottom: "1rem",
    "code": {
      whiteSpace: "normal"
    },
    "a": {
      color: "inherit",
      textDecoration: "none"
    }
  },
  
  "h1": {
    fontSize: "26px",
    lineHeight: "36px"
  },
  
  "h2": {
    fontSize: "24px",
    lineHeight: "34px"
  },
  
  "h3": {
    fontSize: "22px",
    lineHeight: "32px"
  },
  
  "h4": {
    fontSize: "20px",
    lineHeight: "30px"
  },
  
  "h5": {
    fontSize: "18px",
    lineHeight: "28px"
  },
  
  "h6": {
    fontSize: "16px",
    lineHeight: "26px"
  },
  
  // Paragraphs and lists
  "p": {
    marginBottom: "1.45rem"
  },
  
  "ul, ol": {
    marginLeft: "1.45rem",
    marginBottom: "1.45rem",
    padding: 0
  },
  
  "li": {
    marginBottom: "0.725rem"
  },
  
  // Links
  "a": {
    color: colors.primary,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline"
    }
  },
  
  // Code
  "code": {
    padding: "0.1em 0.3em",
    borderRadius: "0.3em",
    fontSize: "0.9em",
    color: colors.text1,
    background: colors.background,
    fontFamily: "'Source Code Pro', monospace"
  },
  
  "pre": {
    background: colors.background,
    border: `1px solid ${colors.divider}`,
    borderRadius: "4px",
    margin: "0.5em 0 1.45rem",
    padding: "1em",
    overflow: "auto",
    "code": {
      background: "none",
      padding: 0,
      fontSize: "15px"
    }
  },
  
  // Blockquotes
  "blockquote": {
    background: colors.background2,
    border: `1px solid #93B1F7`,
    margin: "20px 0",
    padding: "18px 18px 18px 50px",
    position: "relative",
    
    "h1, h2, h3, h4": {
      fontSize: "18px !important",
      lineHeight: "26px",
      color: colors.text1,
      marginBottom: "6px"
    },
    
    "p": {
      fontSize: "14px",
      lineHeight: "24px",
      color: colors.text1,
      marginBottom: 0
    }
  },
  
  // Tables
  "table": {
    border: `1px solid ${colors.divider}`,
    borderSpacing: 0,
    borderRadius: "4px",
    marginBottom: "1.45rem",
    width: "100%",
    
    "th, td": {
      padding: "16px",
      borderBottom: `1px solid ${colors.divider}`,
      textAlign: "left"
    },
    
    "thead th": {
      fontSize: "13px",
      fontWeight: "normal",
      color: colors.text3,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    
    "tbody tr:last-child td": {
      border: 0
    }
  },
  
  // Images
  "img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
    boxShadow: "0 0 0 1px rgba(18,21,26,0.04), 0 1px 4px 0 rgba(0,0,0,0.08)"
  }
});

const DocsTemplate = ({ data, pageContext }) => {
  const { markdownRemark } = data;
  
  // Handle case where markdown file is not found
  if (!markdownRemark) {
    return (
      <div>
        <Helmet>
          <title>Page Not Found | Troubleshoot Docs</title>
        </Helmet>
        <StyledContentWrapper>
          <PageHeader>
            <Heading>Page Not Found</Heading>
          </PageHeader>
          <BodyContent>
            <p>The requested documentation page could not be found.</p>
            <p><strong>Path:</strong> {pageContext.slug}</p>
            <p><strong>Relative Path:</strong> {pageContext.relativePath}</p>
          </BodyContent>
        </StyledContentWrapper>
      </div>
    );
  }
  
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      <Helmet>
        <title>{frontmatter.title} | Troubleshoot Docs</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <StyledContentWrapper>
        <PageHeader>
          <Heading>{frontmatter.title}</Heading>
        </PageHeader>
        <BodyContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledContentWrapper>
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