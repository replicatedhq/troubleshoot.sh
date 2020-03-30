import React from "react";
import { Link } from "gatsby";
import GitHubButton from "react-github-button";
import MobileNavBar from "./MobileNavBar";

import "../../scss/components/shared/NavBar.scss";
require("react-github-button/assets/style.css");

export class NavBar extends React.Component {
  state = {
    mobileNavIsOpen: false
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleNavScroll, true);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleNavScroll, true);
  }

  handleNavScroll = () => {
    const { isMobile } = this.props;
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const distanceY = scrollTop,
    shrinkOn = isMobile ? 100 : 220,
    troubleshootNav = document.getElementById("troubleshoot-header");
    const isHome = window.location.pathname === "/";
    if (!isHome) {
      troubleshootNav && troubleshootNav.classList.add("scrolled");
      return;
    } else if (distanceY > shrinkOn) {
      troubleshootNav && troubleshootNav.classList.add("scrolled");
    } else {
      troubleshootNav && troubleshootNav.classList.remove("scrolled");
    }
  }

  render() {
    const { mobileNavIsOpen } = this.state;
    const { isMobile } = this.props;
    const navBarItems = [
      { linkTo: "/docs/", label: "Docs" },
      { linkTo: "/explore", label: "Explore specs" },
    ];
    const isHome = window.location.pathname === "/";

    return (
      <div className="flex flex-auto">
        <div className={`flex flex-auto ${isMobile ? "MobileNavBarWrapper": "NavBarWrapper"} ${!isHome && "scrolled"}`}>
          <div className={`${isMobile ? "MobileTroubleshootHeader" : "TroubleshootHeader"} flex flex1 ${!isHome && "scrolled"}`} id="troubleshoot-header">
            {isMobile ?
              <div className="flex flex1 alignItems--center">
                <span
                  className={`icon clickable ${mobileNavIsOpen ? "gray-x-icon" : "hamburger-icon"} u-marginLeft--20`}
                  onClick={() => {
                    this.setState({
                      mobileNavIsOpen: !this.state.mobileNavIsOpen
                    });
                  }}
                ></span>
                <span style={{ width: `202px`, height: `19px` }} className="troubleshoot-logo"></span>
              </div>
              :
              <div className="NavBarContainer flex flex1 alignItems--center u-position--relative">
                <Link to="/"><span style={{ width: `271px`, height: `26px` }} className="troubleshoot-logo"></span></Link>
                <div className="flex1 justifyContent--flexStart">
                  <div className="flex1 flex u-height--full">
                    <div className="flex flex-auto">
                      <div className="flex alignItems--center flex1 flex-verticalCenter u-position--relative u-marginRight--20">
                        <div className="flex-column flex-auto u-marginRight--50 justifyContent--center NavItem">
                          <Link to="/docs/" className="u-fontWeight--medium u-color--royalBlue u-lineHeight--normal u-fontSize--normal u-textDecoration--underlineOnHover">Docs</Link>
                        </div>
                        <div className="flex-column flex-auto justifyContent--center NavItem">
                          <Link to="/explore" className="u-fontWeight--medium  u-color--royalBlue u-lineHeight--normal u-fontSize--normal u-textDecoration--underlineOnHover">Explore specs</Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex1 justifyContent--flexEnd right-items">
                      <div className="flex-column flex-auto justifyContent--center">
                        <GitHubButton type="stargazers" size="large" repo="troubleshoot" namespace="replicatedhq" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        {isMobile ? (
          <MobileNavBar
            className="MobileNavBar"
            items={navBarItems}
            isOpen={mobileNavIsOpen}
            onClose={() => {
              this.setState({
                mobileNavIsOpen: false
              });
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default NavBar;