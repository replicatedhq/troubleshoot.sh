import React from "react"
import { graphql } from "gatsby"
import DocsLayout from "../components/DocsLayout"

const DocsTemplate = ({ data, children, pageContext }) => {
  // Handle both Markdown and MDX content
  const content = data.markdownRemark || data.mdx
  const { title, description } = content.frontmatter
  const isMarkdown = !!data.markdownRemark

  return (
    <DocsLayout title={`${title} - Troubleshoot.sh`}>
      {/* Page Header */}
      <div className="docs-page-header">
        <h1 className="docs-page-title">{title}</h1>
        {description && (
          <p className="docs-page-description">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="docs-content">
        {/* Render content based on type */}
        {isMarkdown ? (
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        ) : (
          children
        )}
      </div>

      {/* Navigation Footer */}
      <div className="docs-navigation-footer">
        <div>
          <a 
            href={`https://github.com/replicatedhq/troubleshoot/edit/main/docs/source${content.fields.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="docs-edit-link"
          >
            Edit this page on GitHub →
          </a>
        </div>
      </div>
    </DocsLayout>
  )
}

export const query = graphql`
  query DocsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
  }
`

export default DocsTemplate 