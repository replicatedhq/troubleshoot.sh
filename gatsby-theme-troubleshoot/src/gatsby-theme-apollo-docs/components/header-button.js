import React from "react";
import styled from "@emotion/styled";
import { breakpoints } from "gatsby-theme-apollo-core";
import { GitHubIcon } from "./docs-icons";

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

export default function HeaderButton() {
  return (
    <Container>
      <div className="flex-column flex-auto justifyContent--center alignItems--center">
        <GitHubButton href="https://github.com/replicatedhq/troubleshoot/"> <GitHubIcon style={{marginRight: "5px"}}/> View on GitHub </GitHubButton>
      </div>
    </Container>
  );
}
