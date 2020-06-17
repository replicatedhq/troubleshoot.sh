import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

const Heading = styled.h1(props => ({
  fontFamily: "Roboto Mono",
  fontWeight: "bold",
  fontStyle: "normal",
  fontSize: "26px",
  lineHeight: "36px",
  color: "#163166",
  marginBottom: "5px",
  ":not(:last-child)": {
    marginBottom: 8,
  },
  marginTop: props.hasHeadingImage && 30
}));

const Subheading = styled.h4({
  color: "#163166"
});


export default function PageHeader(props) {
  let headingImage;
  if (props.headingImage) {
    headingImage = props.headingImage.childImageSharp.fluid;
  }

  return (
    <div className="header-wrapper">
      {props.headingImage && <Img fluid={headingImage} />}
      <Heading hasHeadingImage={!!props.headingImage}>{props.title}</Heading>
      {props.description && <Subheading>{props.description}</Subheading>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  headingImage: PropTypes.object
};
