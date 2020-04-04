import * as React from "react";
import * as PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import "../../scss/components/MobileExploreFilters.scss";

export default class MobileSidebar extends React.Component {
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
      isMobile,
      slideOpen,
      pathname,
      onClose,
    } = this.props;

    const mobileDropdownVisibleClasses = `MobileFilters ${isOpen ? "is-open" : ""}`;

    return (
      <nav className={mobileDropdownVisibleClasses}>
        <div className="MobileFilters-menu u-overflow--auto">
          <div className="flex flex1 u-padding--20 justifyContent--spaceBetween alignItems--center">
            <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-lineHeight--more"> Table of contents </p>
            <span className={`${isOpen ? "icon clickable gray-x-icon" : ""}`} onClick={onClose}></span>
          </div>
          <div className="flex u-borderTop--gray u-padding--10">
            <Sidebar
              isMobile={isMobile}
              slideOpen={slideOpen}
              pathname={pathname} />
          </div>
        </div>
        <div className="MobileFilters-bg flex1" onClick={onClose} />
      </nav>
    );
  }
}
