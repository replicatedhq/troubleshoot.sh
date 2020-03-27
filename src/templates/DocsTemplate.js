import React from "react"
import { graphql } from "gatsby"
import DocumentationLayout from "../components/shared/DocumentationLayout";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  location
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  return (
    <DocumentationLayout location={location}>
      <div className="flex-column flex1 u-height--auto u-overflow--auto">
        <div className="u-padding--20 markdown-body">
          <h1>{frontmatter.title}</h1>
          <div
            className="docs-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </DocumentationLayout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
