import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

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

const HeadingImage = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})


export default function PageHeader(props) {
  let headingImage;
  if (props.headingImage) {
    headingImage = props.headingImage.childImageSharp.fluid;
  }

  return (
    <div className="header-wrapper">
      {props.headingImage &&
        <HeadingImage>
          <img src={headingImage.src} width={500} />
        </HeadingImage>}
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
