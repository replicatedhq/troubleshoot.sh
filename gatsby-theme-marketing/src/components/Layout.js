import React from "react";
import PropTypes from "prop-types";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import { Helmet } from "react-helmet"

import "../scss/index.scss";

const Layout = ({ children, isMobile, title }) => {
  return (
    <div className="flex flex1">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
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