import "../prism.less";
import "../custom.less";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import DocsetSwitcher from "./docset-switcher";
import Header from "./header";
import PropTypes from "prop-types";
import React, { createContext, useMemo, useRef, useState } from "react";
import Search from "./search";
import styled from "@emotion/styled";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Button } from "@apollo/space-kit/Button";
import {
  FlexWrapper,
  Layout,
  MenuButton,
  Sidebar,
  SidebarNav,
  breakpoints,
  colors,
  useResponsiveSidebar
} from "gatsby-theme-apollo-core";
import { Helmet } from "react-helmet";
import { HamburgerMenu } from "./docs-icons";
import { graphql, useStaticQuery } from "gatsby";
import { MobileLogo } from "./mobile-logo";
import { SelectedLanguageContext } from "./multi-code-block";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import { ReplicatedWhiteIcon, BannerArrow } from "./suite-banner";

const Main = styled.main({
  flexGrow: 1,
  marginTop: 20,
  [breakpoints.md]: {
    marginTop: 50
  },
  ".scrolledHeader": {
    background: "none",
    boxShadow: "none"
  },
  ".scrolled": {
    visibility: "hidden"
  }
});

const ButtonWrapper = styled.div({
  flexGrow: 1
});

const StyledButton = styled(Button)({
  width: "100%",
  ":not(:hover)": {
    backgroundColor: "#F4F6F8"
  }
});

const StyledIcon = styled(HamburgerMenu)({
  width: "15px",
  height: "12px",
  marginLeft: "auto"
});

const MobileNav = styled.div({
  display: "none",
  [breakpoints.md]: {
    display: "flex",
    alignItems: "center",
    marginRight: 15,
    color: colors.text1
  }
});

const HeaderInner = styled.span({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 32
});

const SuiteBanner = styled.div({
  backgroundColor: "#073551",
  color: "#ffffff",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  zIndex: 100,
  padding: "14px 30px"
});

const LearnMoreBanner = styled.div({
  display: "flex",
  alignItems: "center",
  "a": {
    fontSize: "14px",
    fontWeight: "400",
    textDecoration: "none",
    color: "#ffffff",
    fontFamily: "Roboto Mono",
    [breakpoints.md]: {
      fontSize: "12px",
      marginLeft: 20
    }
  },

  ".banner-arrow": {
    position: "relative",
    marginLeft: "6px",
    top: "3px",
    right: 0,
    width: "9px",
    height: "16px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    display: "inline-block",
    transition: "all 0.2s"
  },

  "&:hover .banner-arrow": {
    right: "-4px"
  }
})

const InnerBanner = styled.div({
  display: "flex",
  flexDirection: "flex-row",
  justifyContent: "space-between",
  alignItems: "center",
  ".replicatedIcon": {
    [breakpoints.md]: {
      width: 150
    }
  }
})

const GA_EVENT_CATEGORY_SIDEBAR = "Sidebar";

function handleToggleAll(expanded) {
  trackCustomEvent({
    category: GA_EVENT_CATEGORY_SIDEBAR,
    action: "Toggle all",
    label: expanded ? "expand" : "collapse"
  });
}

function handleToggleCategory(label, expanded) {
  trackCustomEvent({
    category: GA_EVENT_CATEGORY_SIDEBAR,
    action: "Toggle category",
    label,
    value: Number(expanded)
  });
}

export const NavItemsContext = createContext();

export default function PageLayout(props) {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            siteName
          }
        }
      }
    `
  );

  const {
    sidebarRef,
    openSidebar,
    sidebarOpen,
    handleWrapperClick,
    handleSidebarNavLinkClick
  } = useResponsiveSidebar();

  const buttonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedLanguageState = useLocalStorage("docs-lang");

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const { pathname } = props.location;
  const { siteName, title } = data.site.siteMetadata;
  let frontmatter;
  if (props.data) {
    frontmatter = props.data?.file?.childMdx?.frontmatter || props.data.file?.childMarkdownRemark?.frontmatter;
  }

  const {
    subtitle,
    sidebarContents
  } = props.pageContext;
  const {
    navConfig = {},
    footerNavConfig,
    logoLink,
    algoliaApiKey,
    algoliaAppId,
    algoliaIndexName,
    menuTitle
  } = props.pluginOptions;

  const navItems = useMemo(
    () =>
      Object.entries(navConfig).map(([title, navItem]) => ({
        ...navItem,
        title
      })),
    [navConfig]
  );

  const hasNavItems = navItems.length > 0;
  const sidebarTitle = (
    <span className="title-sidebar">{subtitle || siteName}</span>
  );

  return (
    <Layout>
      <SuiteBanner>
        <InnerBanner>
          <ReplicatedWhiteIcon className="replicatedIcon" />
          <LearnMoreBanner>
            <a href="https://replicated.com/" target="_blank" rel="noopener noreferrer">Learn more about Replicated to operationalize your application</a>
            <span className="banner-arrow">
              <BannerArrow />
            </span>
          </LearnMoreBanner>
        </InnerBanner>
      </SuiteBanner>
      <Helmet
        titleTemplate={["%s", subtitle, title].filter(Boolean).join(" - ")}
      >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Helmet>
      <FlexWrapper onClick={handleWrapperClick}>
        <Sidebar
          responsive
          className="sidebar"
          open={sidebarOpen}
          ref={sidebarRef}
          title={siteName}
          logoLink={logoLink}
        >
          <HeaderInner>
            {hasNavItems ? (
              <ButtonWrapper ref={buttonRef}>
                <StyledButton
                  feel="flat"
                  color={colors.primary}
                  size="small"
                  onClick={openMenu}
                  style={{ display: "block" }}
                >
                  {sidebarTitle}
                  <StyledIcon />
                </StyledButton>
              </ButtonWrapper>
            ) : (
                sidebarTitle
              )}
          </HeaderInner>
          {sidebarContents && (
            <SidebarNav
              contents={sidebarContents}
              pathname={pathname}
              onToggleAll={handleToggleAll}
              onToggleCategory={handleToggleCategory}
              onLinkClick={handleSidebarNavLinkClick}
            />
          )}
        </Sidebar>
          <Main>
            <Header frontmatter={frontmatter}>
              <MobileNav>
                <MenuButton onClick={openSidebar} />
                <MobileLogo width={40} fill="currentColor" />
              </MobileNav>
              {algoliaApiKey && algoliaIndexName && (
                <Search
                  siteName={siteName}
                  apiKey={algoliaApiKey}
                  appId={algoliaAppId}
                  indexName={algoliaIndexName}
                />
              )}
            </Header>
            <SelectedLanguageContext.Provider value={selectedLanguageState}>
              <NavItemsContext.Provider value={navItems}>
                {props.children}
              </NavItemsContext.Provider>
            </SelectedLanguageContext.Provider>
          </Main>
      </FlexWrapper>
      {hasNavItems && (
        <DocsetSwitcher
          siteName={menuTitle || siteName}
          navItems={navItems}
          footerNavConfig={footerNavConfig}
          open={menuOpen}
          openSidebar={sidebarOpen}
          buttonRef={buttonRef}
          onClose={closeMenu}
        />
      )}
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  pluginOptions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};
