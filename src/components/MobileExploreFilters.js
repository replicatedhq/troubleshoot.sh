import * as React from "react";
import * as PropTypes from "prop-types";

import "../scss/components/MobileExploreFilters.scss";

export default class MobileExploreFilters extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    onClose: PropTypes.func,
  };
  static defaultProps = {
    user: {}
  };

  showingCategoryDetails = (category, e) => {
    this.props.showingCategoryDetails(category, e);
    this.props.onClose();
  }

  showingTagFilter = (tag, e) => {
    this.props.showingTagFilter(tag, e);
    this.props.onClose();
  }

  render() {
    const {
      isOpen,
      categoryItems,
      tagItems,
      onClose,
      categoryToShow,
      onCloseCategory,
      tagToShow,
      onCloseTagFiler
    } = this.props;

    const mobileDropdownVisibleClasses = `MobileFilters ${isOpen ? "is-open" : ""}`;

    return (
      <nav className={mobileDropdownVisibleClasses}>
        <div className="MobileFilters-menu u-overflow--auto">
          <div className="flex flex1 u-padding--20 justifyContent--spaceBetween alignItems--center">
            <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-lineHeight--more"> Filters </p>
            <span className={`${isOpen ? "icon clickable gray-x-icon" : ""}`} onClick={onClose}></span>
          </div>
          <div className="flex u-borderTop--gray u-padding--10">
            <div className="flex-column u-marginTop--10">
              <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginBottom--10 u-padding--10"> Categories </p>
              {categoryItems?.map((category, i) => {
                return (
                  <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy ${category.name === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category.name, e)} key={`${category.name}-${i}`}>
                    {category.display}
                    {category.name === categoryToShow && <span className="close" onClick={onCloseCategory}>x</span>}
                  </p>
                )
              })}
              <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10"> Tags <span className="icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small"> </span> </p>
              {tagItems?.map((tag, i) => {
                return (
                  <p className={`List--item  u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 body-copy ${tag === tagToShow && "is-active"}`} onClick={(e) => this.showingTagFilter(tag, e)} key={`${tag}-${i}`}> 
                  {tag} 
                  {tag === tagToShow && <span className="close" onClick={onCloseTagFiler}>x</span>}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
        <div className="MobileFilters-bg flex1" onClick={onClose} />
      </nav>
    );
  }
}
