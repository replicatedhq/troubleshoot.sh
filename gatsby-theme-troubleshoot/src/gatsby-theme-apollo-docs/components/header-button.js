import React from "react";
import styled from "@emotion/styled";
import { breakpoints } from "gatsby-theme-apollo-core";
import GitHubButton from "react-github-button";

require("react-github-button/assets/style.css");

const Container = styled.div({
  display: "flex",
  flexShrink: 0,
  width: 240,
  [breakpoints.lg]: {
    width: "auto",
    marginRight: 0
  },
  [breakpoints.md]: {
    display: "none"
  }
});

export default function HeaderButton() {
  return (
    <Container>
      <div className="flex-column flex-auto justifyContent--center">
        <GitHubButton type="stargazers" size="large" repo="troubleshoot" namespace="replicatedhq" />
      </div>
    </Container>
  );
}
