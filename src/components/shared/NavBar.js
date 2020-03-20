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
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const distanceY = scrollTop,
      shrinkOn = 100,
      troubleshootNav = document.getElementById("troubleshoot-header");

    if (distanceY > shrinkOn) {
      troubleshootNav && troubleshootNav.classList.add("scrolled");
    } else {
      troubleshootNav && troubleshootNav.classList.remove("scrolled");
    }
  }

  render() {
    const { mobileNavIsOpen } = this.state;
    const { isMobile, documentation } = this.props;
    const navBarItems = [
      { linkTo: "/docs", label: "Docs" },
      { linkTo: "/explore", label: "Explore specs" },
    ];

    return (
      <div>
        <div className={`flex flex-auto ${documentation ? "MobileDocNavBarWrapper" : isMobile ? "MobileNavBarWrapper": "NavBarWrapper"}`}>
          <div className={`${documentation ? "MobileDocKurlHeader" : isMobile ? "MobileTroubleshootHeader" : "TroubleshootHeader"} flex flex1`} id="troubleshoot-header">
            {isMobile ?
              <div className="flex flex1 alignItems--center">
                <span
                  className={`icon clickable ${mobileNavIsOpen ? "u-closeIcon" : "u-hamburgerMenu"} u-marginLeft--20`}
                  onClick={() => {
                    this.setState({
                      mobileNavIsOpen: !this.state.mobileNavIsOpen
                    });
                  }}
                ></span>
              </div>
              :
              <div className="NavBarContainer flex flex1 alignItems--center">
                <div className="flex1 justifyContent--flexStart">
                  <div className="flex1 flex u-height--full">
                    <div className="flex flex-auto">
                      <div className="flex alignItems--center flex1 flex-verticalCenter u-position--relative u-marginRight--20">
                        <div className="flex-column flex-auto u-marginRight--50 justifyContent--center NavItem">
                          <Link to="/add-ons" className="u-fontWeight--medium u-color--royalBlue u-lineHeight--normal u-fontSize--normal u-textDecoration--underlineOnHover">Docs</Link>
                        </div>
                        <div className="flex-column flex-auto justifyContent--center NavItem">
                          <Link to="/docs/introduction/" className="u-fontWeight--medium  u-color--royalBlue u-lineHeight--normal u-fontSize--normal u-textDecoration--underlineOnHover">Explore specs</Link>
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