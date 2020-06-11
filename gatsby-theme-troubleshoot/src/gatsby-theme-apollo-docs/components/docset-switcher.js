import PropTypes from "prop-types";
import React, { Fragment, useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import useKey from "react-use/lib/useKey";
import useWindowSize from "react-use/lib/useWindowSize";
import { boxShadow } from "./search";
import { breakpoints, colors, Logo } from "gatsby-theme-apollo-core";
import { transparentize } from "polished";
import { TroubleshootLogo } from "./troubleshoot-basics";
import { Collect, Redact, Analyze } from "./docs-icons";

const Wrapper = styled.div({
  width: "100%",
  height: "100%",
  backgroundColor: transparentize(0.5, colors.text2),
  overflow: "auto",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 3,
  perspective: "1000px",
  transitionProperty: "opacity, visibility",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease-in-out"
});

const transitionDuration = 150; // in ms
const Menu = styled.div({
  width: 820,
  marginBottom: 24,
  borderRadius: 4,
  boxShadow,
  backgroundColor: "white",
  overflow: "hidden",
  position: "absolute",
  transformOrigin: "25% 25%",
  transition: `transform ${transitionDuration}ms ease-in-out`,
  outline: "none",
  [breakpoints.md]: {
    width: 450
  },
  [breakpoints.sm]: {
    width: "calc(100vw - 48px)"
  }
});

const MenuTitle = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "24px"
});

const StyledNav = styled.nav({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  position: "relative"
});

const Timeline = styled.div({
  height: "2px",
  background: "#E5E5E5",
  width: "512px",
  position: "relative",
  top: "1px",
  left: "150px",
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

const NavItem = styled.div({
  display: "flex",
  [breakpoints.md]: {
    width: "100%"
  },
  background: "#F8F8F8",
  boxShadow: "3px 0px 0px #FFFFFF",
  cursor: "pointer",
  clipPath: "polygon(20px 50%, 0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",

  "&:first-of-type": {
    clipPath: "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)"
  },
  
  "&:last-child": {
    clipPath: "polygon(20px 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  }
});

const NavMainItem = styled.div({
  display: "flex",
  width: "70%",
  padding: 15,
  background: "#F8F8F8",
  alignItems: "center",
  [breakpoints.md]: {
    width: "100%"
  },
  '@media (hover: hover)': {
    ':hover': {
      backgroundColor: "#E9F0FF",
    }
  }
})

const NavItemInner = styled.a({
  display: "block",
  height: "100%",
  padding: "15px 20px",
  textDecoration: "none",
  '@media (hover: hover)': {
    ':hover': {
      backgroundColor: "#E9F0FF",
    }
  },
  ".Title": {
    display: "flex",
    alignItems: "center"
  },
  ".Description": {
    display: "flex",
    alignItems: "center",
    marginTop: 15
  },
  ".circleNumber": {
    display: "inline-block",
    fontFamily: "Roboto Mono",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "20px",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    padding: "5px 10px 11px 9px",
    background: "#7A9FEA",
    marginRight: "10px"
  }
});

export const NavItemTitle = styled.h4({
  fontFamily: "Roboto Mono",
  fontSize: "16px",
  lineHeight: "19px",
  marginBottom: 0,
  fontWeight: "bold",
  color: "#163166",
  ":first-of-type": {
    marginBottom: 8
  }
});

export const NavItemDescription = styled.p({
  marginBottom: 0,
  fontSize: 12,
  lineHeight: 1.5,
  color: "#4A4A4A",
  fontFamily: "Helvetica Neue"
});

const FooterNav = styled.nav({
  display: "flex",
  alignItems: "center",
  padding: "16px 24px",
  backgroundColor: "#F8F8F8",
  [breakpoints.md]: {
    display: "block"
  },
  marginTop: 40
});

const FooterNavItem = styled.a({
  color: "#9B9B9B",
  textDecorationLine: "underline",
  ":hover": {
    color: colors.text3
  },
  ":not(:last-child)": {
    marginRight: 24
  }
});

const RightFooter = styled.div({
  display: 'flex',
  marginLeft: 'auto',
  [breakpoints.md]: {
    marginTop: 8
  }
});

const RightLink = styled.a({
  color: "#9B9B9B",
  textDecorationLine: "underline",
  ":hover": {
    color: colors.text3
  },
  ':not(:last-child)': {
    marginRight: 24
  }
});

export default function DocsetSwitcher(props) {
  const menuRef = useRef(null);
  const { width } = useWindowSize();
  useKey("Escape", props.onClose);

  useEffect(() => {
    if (props.open) {
      // focus the menu after it has been transitioned in
      setTimeout(() => {
        menuRef.current.focus();
      }, transitionDuration);
    }
  }, [props.open]);

  function renderIcons(item) {
    if (item.title === "Collect") {
      return <Collect width={170} />
    } else if (item.title === "Redact") {
      return <Redact width={160} />
    } else {
      return <Analyze width={160} />
    }
  }

  const { current } = props.buttonRef;
  const menuStyles = useMemo(() => {
    if (!current) {
      return null;
    }

    const { top, left, height } = current.getBoundingClientRect();
    return {
      top: top + height + 2,
      left
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, width, props.open]);

  function handleWrapperClick(event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  const hasChangeLog = Boolean(
    props.hasChangeLog
  );

  const mainItem = props.navItems.find(item => item.main);
  const otherItems = props.navItems.filter(item => !item.main);

  console.log(otherItems)

  return (
    <Wrapper
      onClick={handleWrapperClick}
      style={{
        opacity: props.open ? 1 : 0,
        visibility: props.open ? "visible" : "hidden"
      }}
    >
      <Menu
        ref={menuRef}
        tabIndex={-1}
        style={{
          ...menuStyles,
          transform:
            !props.open && "translate3d(0,-24px,-16px) rotate3d(1,0,0.1,8deg)"
        }}
      >
        <MenuTitle>
          <Logo />
        </MenuTitle>
        <StyledNav>
          {mainItem &&
            <NavMainItem key={mainItem.url}>
              <TroubleshootLogo width={95} />
              <NavItemInner href={mainItem.url}>
                <NavItemTitle>{mainItem.title}</NavItemTitle>
                <NavItemDescription>{mainItem.description}</NavItemDescription>
              </NavItemInner>
            </NavMainItem>}
        </StyledNav>
        <Timeline>
          <span className="first"></span>
          <span className="second"></span>
          <span className="last"></span>
        </Timeline>
        <StyledNav>
          {otherItems.map((navItem, i) => (
            <NavItem key={navItem.url}>
              <NavItemInner href={navItem.url}r>
                <div className="Title">
                  <div className="circleNumber"> {i + 1} </div>
                  <NavItemTitle>{navItem.title}</NavItemTitle>
                </div>
                <div className="Description">
                  {renderIcons(navItem)}
                  <NavItemDescription>{navItem.description}</NavItemDescription>
                </div>
              </NavItemInner>
            </NavItem>
          ))}
        </StyledNav>
        {(props.footerNavConfig || hasChangeLog) && (
          <FooterNav>
            <Fragment>
              {props.footerNavConfig &&
                Object.entries(props.footerNavConfig).map(([text, props]) => (
                  <FooterNavItem key={text} {...props}>
                    {text}
                  </FooterNavItem>
                ))}
              {hasChangeLog && (
                <RightFooter>
                  {props.changeLogObj && (
                    <RightLink
                      href={props.changeLogObj.href}
                      title="Changelog"
                      target="_blank"
                    >
                      {props.changeLogObj.title}
                    </RightLink>
                  )}
                </RightFooter>
              )}
            </Fragment>
          </FooterNav>
        )}
      </Menu>
    </Wrapper>
  );
}

DocsetSwitcher.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
  siteName: PropTypes.string.isRequired,
  navItems: PropTypes.array.isRequired,
  footerNavConfig: PropTypes.object.isRequired
};
