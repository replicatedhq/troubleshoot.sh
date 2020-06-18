import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { HEADER_HEIGHT } from "../utils";
import { breakpoints } from "gatsby-theme-apollo-core";

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
  marginTop: 30
})

function handleHeaderScroll() {
  const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  const distanceY = scrollTop,
  showHeaderOn = 100,
  wrapperTop = document.getElementById("heading");
  if (typeof window !== "undefined") {
     if(distanceY > showHeaderOn) {
      wrapperTop && wrapperTop.classList.add("scrolledHeader");
    } else {
      wrapperTop && wrapperTop.classList.remove("scrolledHeader");
    }
  }
  const imageTop = document.getElementById("heading_image");
  if (typeof window !== "undefined") {
     if(distanceY > showHeaderOn) {
      wrapperTop && imageTop.classList.add("scrolled");
    } else {
      wrapperTop && imageTop.classList.remove("scrolled");
    }
  }
}

export default function Header(props) {
  let headingImage;
  if (props?.frontmatter?.headingImage) {
    headingImage = props.frontmatter.headingImage.publicURL;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderScroll, true);
    handleHeaderScroll();
  }, []);



  return (
    <Wrapper hasBackground={!!props?.frontmatter?.headingImage} id="heading">
      <InnerWrapper>{props.children}</InnerWrapper>
      {props?.frontmatter?.headingImage &&
        <HeadingImage id="heading_image">
          <img src={headingImage} alt="header_image" width={500} />
        </HeadingImage>
      }
    </Wrapper>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  headingImage: PropTypes.object
};
