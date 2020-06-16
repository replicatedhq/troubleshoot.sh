import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const Heading = styled.h1({
  fontFamily: "Roboto Mono",
  fontWeight: "bold",
  fontStyle: "normal",
  fontSize: "26px",
  lineHeight: "36px",
  color: "#163166",
  marginBottom: "5px",
  ":not(:last-child)": {
    marginBottom: 8,
  }
});

const Subheading = styled.h4({
  color: "#163166"
});

export default function PageHeader(props) {
  return (
    <div className="header-wrapper">
      <Heading>{props.title}</Heading>
      {props.description && <Subheading>{props.description}</Subheading>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
