import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";

import "../../scss/components/shared/NavBar.scss";

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
              <span className={`${isOpen ? "icon clickable gray-x-icon" : ""}`} onClick={onClose}></span>
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
              <li>
                <a href="https://github.com/replicatedhq/troubleshoot/" target="_blank" rel="noopener noreferrer" className="github-btn flex justifyContent--center alignItems--center">
                  <span className="icon github-icon" />
                        View on GitHub
                        </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="MobileNav-bg flex1" onClick={onClose} />
      </nav>
    );
  }
}
