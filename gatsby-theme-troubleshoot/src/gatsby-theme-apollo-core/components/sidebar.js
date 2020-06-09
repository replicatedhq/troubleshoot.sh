import Logo from "./logo";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { breakpoints } from "gatsby-theme-apollo-core";
import styled from "@emotion/styled";
import { transparentize } from "polished";
import GitHubButton from "react-github-button";

require("react-github-button/assets/style.css");

const Container = styled.aside({
  flexShrink: 0,
  width: 312,
  height: "100vh",
  padding: 24,
  borderRight: `1px solid #E5E5E5`,
  overflowY: "auto",
  position: "sticky",
  top: 0,
  ".GithubStarButton": {
    marginTop: "20px"
  }
}
);

const ResponsiveContainer = styled(Container)(props => ({
  [breakpoints.md]: {
    height: "100%",
    backgroundColor: "white",
    boxShadow: `0 0 48px ${transparentize(0.75, "black")}`,
    position: "fixed",
    zIndex: 2,
    opacity: props.open ? 1 : 0,
    visibility: props.open ? "visible" : "hidden",
    transform: props.open ? "none" : "translateX(-100%)",
    transitionProperty: "transform, opacity, visibility",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out"
  }
}));

const Header = styled.div({
  display: "flex",
  marginBottom: 24
});

const StyledLink = styled.a({
  textDecoration: "none"
});

const Sidebar = React.forwardRef((props, ref) => {
  const content = (
    <Fragment>
      <Header>
        <StyledLink href={props.logoLink}>
          <Logo />
        </StyledLink>
      </Header>
      <div className={props.className}>{props.children}</div>
    </Fragment>
  );

  if (props.responsive) {
    return (
      <ResponsiveContainer ref={ref} open={props.open}>
        {content}
        {props.open ?
          <div className="GithubStarButton">
            <GitHubButton type="stargazers" size="large" repo="troubleshoot" namespace="replicatedhq" />
          </div> : null}
      </ResponsiveContainer>
    );
  }

  return <Container>{content}</Container>;
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  responsive: PropTypes.bool,
  logoLink: PropTypes.string,
  className: PropTypes.string
};

Sidebar.defaultProps = {
  logoLink: "/"
};

export default Sidebar;
