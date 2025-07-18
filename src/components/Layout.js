import React from "react"
import { Helmet } from "react-helmet"
import NavBar from "./shared/NavBar"
import Footer from "./shared/Footer"
import "../scss/index.scss"

const Layout = ({ children, title = "Troubleshoot.sh", isMobile = false }) => {
  return (
    <div className="flex-column flex1">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Troubleshoot documentation and guides" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      {/* Replicated Suite Banner */}
      {!isMobile ? (
        <div className="suite-banner">
          <div className="flex flex-row justifyContent--spaceBetween">
            <div className="repl-logo-white"></div>
            <div>
              <a href="https://replicated.com/" target="_blank" rel="noopener noreferrer">
                Learn more about Replicated to operationalize your application
                <span className="banner-arrow"></span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-suite-banner">
          <div className="flex flex-row justifyContent--spaceBetween">
            <div className="flex flex1 alignItems--center">
              <div className="repl-logo-white"></div>
            </div>
            <div className="u-marginLeft--normal">
              <a href="https://replicated.com/" target="_blank" rel="noopener noreferrer">
                Learn more about Replicated to operationalize your application
                <span className="banner-arrow"></span>
              </a>
            </div>
          </div>
        </div>
      )}

      <NavBar isMobile={isMobile} title={title} />
      
      <div className="u-minHeight--full flex-column flex1">
        <main className="flex-column flex1">{children}</main>
        <div className="flex-auto Footer-wrapper u-width--full">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
