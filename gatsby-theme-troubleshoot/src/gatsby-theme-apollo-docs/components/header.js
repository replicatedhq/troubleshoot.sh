import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { HEADER_HEIGHT } from "../utils";
import { breakpoints } from "gatsby-theme-apollo-core";

import { Learn } from "./docs-icons";

const Wrapper = styled.header(props => ({
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 1,
  background: props.hasBackground && "linear-gradient(0deg, rgba(39, 86, 179, 0.5) -589.21%, rgba(39, 86, 179, 0) 83.06%)",
  paddingBottom: props.hasBackground && 30,
  boxShadow: props.hasBackground && "inset 0px -1px 0px #E5E5E5"
}));

const InnerWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  height: HEADER_HEIGHT,
  padding: "0 56px",
  backgroundColor: "white",
  [breakpoints.md]: {
    padding: "0 24px"
  }
});

const HeadingImage = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 30,
  marginBottom: 30
})

const LearnTroubleshoot = styled.a(props => ({
  display: "flex",
  background: props.active ? "#326DE6" : "#F8F8F8",
  color: props.active ? "#FFFFFF" : "#163166",
  alignItems: "center",
  padding: 12,
  cursor: "pointer",
  fontFamily: "Roboto Mono",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "18px",
  textDecoration: "none"
}))

const Stepper = styled.div({
  display: "flex",
  padding: 0,
  marginTop: 20,
  position: "relative",
  width: "100%",
  background: "#FFFFFF",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
})

const Step = styled.a(props => ({
  display: "flex",
  alignItems: "center",
  padding: "15px 50px 15px 50px",
  background: props.active ? "#326DE6" : "#F8F8F8",
  color: props.active ? "#FFFFFF" : "#163166",
  margin: "0 0 0 -19px",
  cursor: "pointer",
  fontFamily: "Roboto Mono",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "14px",
  textDecoration: "none",
  clipPath: "polygon(20px 50%, 0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",

  "&:first-of-type": {
    clipPath: "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",
    marginLeft: 0
  },

  "&:last-child": {
    clipPath: "polygon(20px 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  },

  ":hover": {
    background: "#E9F0FF",
    color: "#163166"
  }
}))

const CircleNumber = styled.div({
  display: "inline-block",
  fontFamily: "Roboto Mono",
  color: "#FFFFFF",
  textAlign: "center",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "16px",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  padding: "4px 7px 4px 7px",
  background: "#7A9FEA",
  marginRight: 10
})

const CenteredDiv = styled.div(props => ({
  display: "flex",
  flexDirection: props.column && "column",
  alignItems: "center",
  justifyContent: "center"
}))


const Timeline = styled.div({
  height: "2px",
  background: "#E5E5E5",
  width: "387px",
  display: "flex",
  position: "relative",
  marginRight: 25,
  marginTop: 25,
  ".first": {
    top: 0,
    left: 0,
    display: "block",
    height: "10px",
    border: "1px solid #E5E5E5",
    background: "#E5E5E5",
    position: "absolute"
  },
  ".second": {
    top: "-18px",
    left: "50%",
    display: "block",
    height: "20px",
    border: "1px solid #E5E5E5",
    background: "#E5E5E5",
    position: "absolute"
  },
  ".last": {
    top: 0,
    left: "100%",
    display: "block",
    height: "10px",
    border: "1px solid #E5E5E5",
    background: "#E5E5E5",
    position: "absolute"
  }
})


function handleHeaderScroll() {
  const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  const distanceY = scrollTop,
    showHeaderOn = 100,
    wrapperTop = document.getElementById("heading");
  if (typeof window !== "undefined") {
    if (wrapperTop) {
      if (distanceY > showHeaderOn) {
        wrapperTop && wrapperTop.classList.add("scrolledHeader");
      } else {
        wrapperTop && wrapperTop.classList.remove("scrolledHeader");
      }
    }
  }
  const imageTop = document.getElementById("heading_image");
  if (typeof window !== "undefined") {
    if (imageTop) {
      if (distanceY > showHeaderOn) {
        imageTop && imageTop.classList.add("scrolled");
      } else {
        imageTop && imageTop.classList.remove("scrolled");
      }
    }
  }
}

function renderArrowsHeader(type) {
  return (
    <Stepper>
      <Step active={type === "collect"} href="/collect"> <CircleNumber> 1 </CircleNumber>Collect</Step>
      <Step active={type === "redact"} href="/redact"> <CircleNumber> 2 </CircleNumber> Redact</Step>
      <Step active={type === "analyze"} href="/analyze"> <CircleNumber> 3 </CircleNumber>Analyze</Step>
    </Stepper>
  )
}

function buildIntroHeader(type) {
  return (
    <div>
      {type === "learn" &&
        <CenteredDiv column>
          <LearnTroubleshoot active href="/learn">
            <Learn width={50} />
            <div>Learn Troubleshoot</div>
          </LearnTroubleshoot>
          <Timeline>
            <span className="first"></span>
            <span className="second"></span>
            <span className="last"></span>
          </Timeline>
        </CenteredDiv>}
      {renderArrowsHeader(type)}
    </div>
  )
}

export default function Header(props) {
  useEffect(() => {
    window.addEventListener("scroll", handleHeaderScroll, true);
    handleHeaderScroll();
  }, []);

  return (
    <Wrapper hasBackground={!!props?.frontmatter?.introHeader} id="heading">
      <InnerWrapper>{props.children}</InnerWrapper>
      {props?.frontmatter?.introHeader &&
        <HeadingImage id="heading_image">
          {buildIntroHeader(props.frontmatter.introHeader)}
        </HeadingImage>
      }
    </Wrapper>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  introHeader: PropTypes.string
};
