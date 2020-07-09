import PropTypes from "prop-types";
import React from "react";
import {Helmet} from "react-helmet";
import favicon from "../../../images/favicon.ico";

export default function SEO(props) {
  const {title, description, siteName, children } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <link rel="icon" href={favicon} />
      {children}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  children: PropTypes.node
};