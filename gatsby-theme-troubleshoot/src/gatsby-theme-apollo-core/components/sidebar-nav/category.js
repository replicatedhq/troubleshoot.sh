import PropTypes from "prop-types";
import React, {Fragment} from "react";
import styled from "@emotion/styled";
import {Link} from "gatsby";

const iconSize = 10;
const headingStyles = {
  display: "flex",
  alignItems: "center",
  fontFamily: "Roboto Mono",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "19px",
  width: "100%",
  border: 0,
  padding: "0.75em 0",
  color: "#163166",
  background: "none",
  outline: "none",
  h6: {
    margin: 0,
    fontWeight: "bold",
    color: "inherit"
  },
  svg: {
    display: "block",
    width: iconSize,
    height: iconSize,
    marginLeft: "auto",
    fill: "currentColor"
  },
  "&.active": {
    color: "#326DE6"
  }
};

const StyledButton = styled.button(headingStyles, {
  ":not([disabled])": {
    cursor: "pointer"
  }
});

const StyledLink = styled(Link)(headingStyles, {
  textDecoration: "none"
});

export default function Category(props) {
  const contents = (
    <Fragment>
      <h6>{props.title}</h6>
      {React.createElement(props.icon, {
        style: {
          visibility: props.onClick ? "visible" : "hidden"
        }
      })}
    </Fragment>
  );

  const className = props.active && "active";
  return (
    <div>
      {!props.onClick && props.path ? (
        <StyledLink className={className} to={props.path}>
          {contents}
        </StyledLink>
      ) : (
        <StyledButton
          className={className}
          onClick={props.onClick ? () => props.onClick(props.title) : null}
        >
          {contents}
        </StyledButton>
      )}
      {props.children}
    </div>
  );
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};
