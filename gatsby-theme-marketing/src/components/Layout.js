import React from "react";
import PropTypes from "prop-types";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import { Helmet } from "react-helmet"
import favicon from "../images/favicon.ico";


import "../scss/index.scss";

const Layout = ({ children, isMobile, title }) => {
  return (
    <div className="flex flex1">
      {!isMobile ?
        <div className="suite-banner">
          <div className="flex flex-row justifyContent--spaceBetween">
            <div className="repl-logo-white"></div>
            <div>
              <a href="https://blog.replicated.com/announcing-kots/" target="_blank" rel="noopener noreferrer">Learn more about Replicated to operationalize your KOTS app<span className="banner-arrow"></span></a>
            </div>
          </div>
        </div>
        :
        <div className="mobile-suite-banner">
          <div className="flex flex-row justifyContent--spaceBetween">
            <div className="flex flex1 alignItems--center">
              <div className="repl-logo-white"></div>
            </div>
            <div className="u-marginLeft--normal">
              <a href="https://blog.replicated.com/announcing-kots/" target="_blank" rel="noopener noreferrer">Learn more about Replicated to operationalize your KOTS app<span className="banner-arrow"></span></a>
            </div>
          </div>
        </div>
      }
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href={favicon} />
      </Helmet>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;