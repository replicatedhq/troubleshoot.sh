import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "@reach/router";
import GitHubButton from "react-github-button";

import "../../scss/components/shared/NavBar.scss";
require("react-github-button/assets/style.css");

export default class MobileNavBar extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    onClose: PropTypes.func,
  };
  static defaultProps = {
    user: {}
  };

  render() {
    const {
      isOpen,
      items,
      onClose,
    } = this.props;

    const mobileDropdownVisibleClasses = `MobileNav ${isOpen ? "is-open" : ""}`;

    return (
      <nav className={mobileDropdownVisibleClasses}>
        <div className="MobileNav-menu flex-column flex1 u-overflow--hidden">
          <div className="u-overflow--auto flex-1-auto">
            <div className="flex flex1 u-padding--20">
              <span className={`${isOpen ? "icon clickable u-closeIcon" : ""}`} onClick={onClose}></span>
            </div>
            <ul className="MobileNav-items flex flex-column alignItems--center">
              {items.map((item, i) => (
                <li
                  className="MobileNav-item"
                  key={`item-${i}`}
                  onClick={onClose}
                >
                  {item.linkTo
                    ?
                    <Link className="mobile-label" to={item.linkTo}>{item.label}</Link>
                    : item.href ?
                      <a className="mobile-label" href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
                      :
                      null
                  }
                </li>
              ))
              }
              <li> <GitHubButton type="stargazers" size="large" repo="kurl" namespace="replicatedhq" /> </li>
            </ul>
          </div>
        </div>
        <div className="MobileNav-bg flex1" onClick={onClose} />
      </nav>
    );
  }
}
