import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "@reach/router";
import { Resizer } from "./Resize";
import { BreakpointConfig } from "../../services/breakpoints";

import { Utilities } from "../../utils/utilities";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./NavBar";
import { Helmet } from "react-helmet"


@Resizer(BreakpointConfig)
class DocumentationLayout extends Component {
  state = {
    isMobile: false,
    toggleTableOfContents: false
  }

  allImagesLoaded = (hash) => {
    let counter = 0;

    const incrementCounter = () => {
      counter++;
      if (counter === document.images.length) {
        this.scrollTo(hash);
      }
    }

    [].forEach.call(document.images, (img) => {
      if (img.complete) {
        incrementCounter();
      } else {
        img.addEventListener("load", incrementCounter, false);
      }
    });
  }

  scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) return window.scrollTo(0, el.offsetTop - 100);
    return false
  }

  componentDidMount() {
    if (this.props.breakpoint) {
      this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
    if (this.props.location && this.props.location.hash) {
      if (document.images && document.images.length > 0) {
        this.allImagesLoaded(this.props.location.hash);
      } else {
        this.scrollTo(this.props.location.hash);
      }
    }
  }

  componentDidUpdate(lastProps) {
    if (this.props.breakpoint !== lastProps.breakpoint && this.props.breakpoint) {
      this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
  }

  toggleTableOfContents = () => {
    this.setState({ toggleTableOfContents: !this.state.toggleTableOfContents })
  }

  render() {
    const { children } = this.props;
    const { isMobile, toggleTableOfContents } = this.state;
    const splitPathname = this.props.location.pathname.split("/");


    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{children.props.children.props.children[0].props.children}</title>
        </Helmet>
        <Navbar isMobile={isMobile} documentation={isMobile && true} />
        <div className={`u-minHeight--full u-width--full u-overflow--auto flex-column flex1 ${isMobile ? "" : "u-marginBottom---40"}`}>
          {isMobile ?
            <div className="flex1 u-background--alabaster u-marginTop--50 u-padding--row">
              {splitPathname.length === 4 ?
                <span className="u-fontSize--small u-fontWeight--medium u-color--scorpion u-lineHeight--normal u-marginTop--small">
                  <Link to={splitPathname[3] === "" ? this.props.location.pathname : `/${splitPathname[1]}/${splitPathname[2]}/`} className="replicated-link">{Utilities.titleize(splitPathname[2])}</Link>
                  <span className="u-color--dustyGray"> / {splitPathname[3] === "" ? "Overview" : Utilities.titleize(splitPathname[3])} </span>
                </span>
                :
                <span className="u-fontSize--small u-fontWeight--medium u-color--scorpion u-lineHeight--normal u-marginTop--small">
                  <Link to={`/${splitPathname[1]}/${splitPathname[2]}/`} className="replicated-link"> {Utilities.titleize(splitPathname[2])} </Link>
                  <Link to={`/${splitPathname[1]}/${splitPathname[2]}/${splitPathname[3]}/overview`} className="replicated-link"> / {Utilities.titleize(splitPathname[3])} </Link>
                  <span className="u-color--dustyGray"> / {Utilities.titleize(splitPathname[4])} </span>
                </span>
              }
            </div> : null}
          <div className={`${isMobile ? "Mobile--wrapper flex" : "Sidebar-wrapper"}`}>
            {isMobile ?
              <button className="Button secondary blue flex1" onClick={() => this.toggleTableOfContents()}> Table of contents </button>
              :
              <Sidebar
                isMobile={isMobile}
                slideOpen={true}
                pathname={this.props.location.pathname}
              />
            }
          </div>
          <div className={`${isMobile ? "docs-mobile-container" : "docs-container"} flex-column flex1`}>
            {!isMobile ?
              <div className="flex-column flex1 docsWidth u-padding--20">
                <div className="flex1 u-marginBottom--20">
                  {splitPathname.length === 4 ?
                    <span className="u-fontSize--small u-fontWeight--medium u-color--scorpion u-lineHeight--normal u-marginTop--small">
                      <Link to={splitPathname[3] === "" ? this.props.location.pathname : `/${splitPathname[1]}/${splitPathname[2]}/`} className="replicated-link">{Utilities.titleize(splitPathname[2])}</Link>
                      <span className="u-color--dustyGray"> / {splitPathname[3] === "" ? "Overview" : Utilities.titleize(splitPathname[3])} </span>
                    </span>
                    :
                    <span className="u-fontSize--small u-fontWeight--medium u-color--scorpion u-lineHeight--normal u-marginTop--small">
                      <Link to={`/${splitPathname[1]}/${splitPathname[2]}/`} className="replicated-link"> {Utilities.titleize(splitPathname[2])} </Link>
                      <Link to={`/${splitPathname[1]}/${splitPathname[2]}/${splitPathname[3]}/overview`} className="replicated-link"> / {Utilities.titleize(splitPathname[3])} </Link>
                      <span className="u-color--dustyGray"> / {Utilities.titleize(splitPathname[4])} </span>
                    </span>
                  }
                </div>
                {children}
              </div>
              :
              children
            }
          </div>
        </div>
        {toggleTableOfContents &&
          <MobileSidebar
            className="MobileNavBar"
            isMobile={isMobile}
            slideOpen={true}
            pathname={this.props.location.pathname}
            isOpen={toggleTableOfContents}
            onClose={this.toggleTableOfContents}
          />
        }
      </div>
    );

  }
}

DocumentationLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DocumentationLayout;
