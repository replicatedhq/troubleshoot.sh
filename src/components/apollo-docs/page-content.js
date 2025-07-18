import PropTypes from "prop-types";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import {PageNav} from "gatsby-theme-apollo-core";
import {withPrefix} from "gatsby";
import { breakpoints } from "gatsby-theme-apollo-core";
import { IconGithub } from "@apollo/space-kit/icons/IconGithub";

const Wrapper = styled.div({
  display: "flex",
  alignItems: "flex-start"
});

const InnerWrapper = styled.div({
  flexGrow: 1,
  width: 0
});

const BodyContent = styled.div({
  fontFamily: "Helvetica Neue",
  fontStyle: "normal",
  fontWeight: "normal",
  color: "#4A4A4A",
  [["h1", "h2", "h3", "h4", "h5", "h6"]]: {
    code: {
      whiteSpace: "normal"
    },
    a: {
      color: "inherit",
      textDecoration: "none",
      "&.anchor": {
        display: "none"
      }
    },
    color: "#163166",
    fontFamily: "Roboto Mono",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  "*:not(style) +": {
    [["h1", "h2", "h3"]]: {
      marginBottom: "20px"
    },
    [["h4", "h5", "h6"]]: {
      marginBottom: "15px"
    }
  },
  "p": {
    fontSize: "16px",
    lineHeight: "28px",
  },
  "h2": {
    fontSize: "24px",
    lineHeight: "34px"
  },
  "h3": {
    fontSize: "22px",
    lineHeight: "32px"
  },
  "h4": {
    fontSize: "20px",
    lineHeight: "30px"
  },
  "h5": {
    fontSize: "18px",
    lineHeight: "28px"
  },
  "h6": {
    fontSize: "16px",
    lineHeight: "26px"
  },
  [breakpoints.md]: {
    "img": {
      maxWidth: "350px !important"
    }
  }
});

const EditLink = styled.div({
  fontFamily: "Helvetica Neue",
  marginTop: 48,
  display: "flex",
  [breakpoints.lg]: {
    display: "flex"
  },
  [breakpoints.md]: {
    display: "flex"
  },
  [breakpoints.sm]: {
    display: "flex",
    marginTop: 24
  }
});

const AsideLinkWrapper = styled.h5({
  display: "flex",
  marginBottom: 0,
  ":not(:last-child)": {
    marginBottom: 16
  }
});

const AsideLinkInner = styled.a({
  display: "flex",
  alignItems: "center",
  color: "#5A6270",
  textDecoration: "none",
  ":hover": {
    color: "#a1a2a5"
  },
  svg: {
    width: 20,
    height: 20,
    marginRight: 6,
    fill: "currentColor"
  }
});

function AsideLink(props) {
  return (
    <AsideLinkWrapper>
      <AsideLinkInner target="_blank" rel="noopener noreferrer" {...props} />
    </AsideLinkWrapper>
  );
}


export default function PageContent(props) {
  const contentRef = useRef(null);

  const pageIndex = props.pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === props.pathname ||
      prefixedPath.replace(/\/$/, '') === props.pathname
    );
  });

  const editLink = props.githubUrl && (
    <AsideLink href={props.githubUrl}>
      <IconGithub /> Edit on GitHub
    </AsideLink>
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <BodyContent ref={contentRef} className="content-wrapper">
          {props.children}
        </BodyContent>
        <EditLink>{editLink}</EditLink>
        <PageNav
          prevPage={props.pages[pageIndex - 1]}
          nextPage={props.pages[pageIndex + 1]}
        />
      </InnerWrapper>
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  githubUrl: PropTypes.string,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  graphManagerUrl: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  spectrumUrl: PropTypes.string
};
