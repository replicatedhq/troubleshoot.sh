import React from "react"
import { Helmet } from "react-helmet"
import NavBar from "./shared/NavBar"
import Footer from "./shared/Footer"
import DocsSidebar from "./DocsSidebar"

const DocsLayout = ({ children, title = "Documentation - Troubleshoot.sh", pageContext }) => {
  return (
    <div className="flex-column flex1">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Troubleshoot documentation and guides" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      {/* Replicated Suite Banner */}
      <div className="suite-banner">
        <div className="flex justifyContent--spaceBetween alignItems--center container">
          <div className="repl-logo-white"></div>
          <div>
            <a href="https://replicated.com/" target="_blank" rel="noopener noreferrer">
              Learn more about Replicated to operationalize your application
              <span className="banner-arrow"></span>
            </a>
          </div>
        </div>
      </div>

      <NavBar title={title} />
      
      <div className="docs-layout flex flex1">
        {/* Sidebar */}
        <div className="docs-sidebar">
          <DocsSidebar pageContext={pageContext} />
        </div>
        
        {/* Main Content */}
        <main className="docs-content flex-column flex1">
          {children}
        </main>
      </div>
      
      <div className="flex-auto Footer-wrapper u-width--full">
        <Footer />
      </div>
    </div>
  )
}

export default DocsLayout 