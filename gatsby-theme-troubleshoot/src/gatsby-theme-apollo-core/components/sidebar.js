import Logo from "./logo";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { breakpoints } from "gatsby-theme-apollo-core";
import styled from "@emotion/styled";
import { transparentize } from "polished";
import {ReactComponent as GitHubIcon} from "../../../images/GH_icon.svg";

const Container = styled.aside({
  flexShrink: 0,
  width: 312,
  height: "100vh",
  padding: 24,
  borderRight: `1px solid #E5E5E5`,
  overflowY: "auto",
  position: "sticky",
  top: 0,
  marginTop: 20,
  ".GithubStarButton": {
    marginTop: 20
  }
}
);

const GitHubButton = styled.a({
  display: "flex",
  alignItems: "center",
  font: "700 11px/14px Helvetica Neue,Helvetica,Arial,sans-serif",
  backgroundColor: "#eee",
  backgroundImage: "linear-gradient(180deg,#fcfcfc 0,#eee)",
  border: "1px solid #d5d5d5",
  padding: "3px 10px 3px 8px",
  fontSize: "16px",
  lineHeight: "22px",
  borderRadius: "4px",
  color: "#333",
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer"
});

const StyledGitHubIcon = styled(GitHubIcon)({
});

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
    transitionTimingFunction: "ease-in-out",
    marginTop: props.open ? "60px" : "none"
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
            <GitHubButton href="https://github.com/replicatedhq/troubleshoot/"> <StyledGitHubIcon style={{ marginRight: "5px" }} /> View on GitHub </GitHubButton>
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
