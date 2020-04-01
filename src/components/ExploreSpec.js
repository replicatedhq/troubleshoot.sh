import * as React from "react";
import { Link } from "@reach/router";

import { Utilities } from "../utils/utilities";
import "../scss/components/ExploreSpec.scss";
import ExploreInfo from "./shared/ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";
import Search from "./shared/Search";


class ExploreSpec extends React.Component {
  state = {
    categoryToShow: "",
    showTagsList: false,
    showMobileFilters: false,
    mobileFiltersOpen: false,
    tagsToShow: []
  }

  showingCategoryDetails = (category, e) => {
    if (!e.target.classList.contains("icon")) {
      this.setState({ categoryToShow: category, tagsToShow: [] });
    }
  }

  showingTagFilter = (tag, e) => {
    if (!e.target.classList.contains("icon")) {
      const doesTagAlreadyExist = this.state.tagsToShow.find(stateTag => stateTag === tag);
      if (!doesTagAlreadyExist) {
        this.setState({ tagsToShow: [...this.state.tagsToShow, tag], categoryToShow: "" });
      }
    }
  }

  onCloseCategory = () => {
    this.setState({ categoryToShow: "" });
  }

  onCloseTagFilter = (tag) => {
    this.setState({ tagsToShow: this.state.tagsToShow.filter(stateTag => stateTag !== tag) });
  }

  toggleTags = () => {
    this.setState({ showTagsList: !this.state.showTagsList });
  }

  onMobileFiltersClick = () => {
    this.setState({ mobileFiltersOpen: !this.state.mobileFiltersOpen });
  }

  componentDidMount() {
    import("../../static/specs.json").then(module => {
      this.setState({ specJson: module });
    });
  }


  render() {
    const { categoryToShow, showTagsList, tagsToShow, specJson } = this.state;
    const { isMobile } = this.props;
    const specsToShow = specJson?.specs?.filter(spec => tagsToShow?.find(tag => spec.tags.includes(tag)));


    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section u-marginTop--70 gradient border justifyContent--center alignItems--center">
          <div className="container">
            <p className="u-fontSize--jumbo u-fontWeight--bold u-color--biscay u-lineHeight--more"> Explore troubleshoot specs </p>
            <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy">
              Find collector and analyzer specs. You can search for a tag like “database” or something even more specific like “mysql”. </p>
          </div>
        </div>

        <div className={`section ${!isMobile && "u-marginTop--30"}`}>
          <div className={`flex flex1 container ${isMobile && "justifyContent--center"}`}>
            {!isMobile ?
              <div className="flex">
                <div className="flex-column">
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginBottom--10 u-padding--10"> Categories </p>
                  {specJson?.categories?.map((category, i) => (
                    <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy flex alignItems--center justifyContent--spaceBetween ${category.name === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category.name, e)} key={`${category.name}-${i}`}>
                      {category.display}
                      {category.name === categoryToShow && <span className="icon white-x-icon u-marginLeft--small" onClick={this.onCloseCategory} />}
                    </p>
                  ))}
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10" onClick={() => this.toggleTags()}> Tags <span className="icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small"> </span> </p>
                  {showTagsList ?
                    specJson?.tags.map((tag, i) => (
                      <p className={`List--item  u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 flex justifyContent--spaceBetween alignItems--center body-copy ${tagsToShow.includes(tag) && "is-active"}`} onClick={(e) => this.showingTagFilter(tag, e)} key={`${tag}-${i}`}>
                        {tag}
                        {tagsToShow.includes(tag) && <span className="icon white-x-icon" onClick={() => this.onCloseTagFilter(tag)} />}
                      </p>
                    ))
                    :
                    null
                  }
                </div>
              </div>
              :
              null
            }
            <div className={`flex1 flex-column ${!isMobile && "u-marginLeft--50"}`}>
              <div className="ExploreSearch--wrapper u-overflow--scroll">
                <div className="ExploreSearch--search">
                  <Search classNames={"SearchBox--wrapper"}/>
                </div>
              </div>
              {isMobile && <div className="flex flex-column u-marginTop--20">
                <button className="Button secondary" onClick={() => this.onMobileFiltersClick()}> Filters </button>
              </div>}
              {tagsToShow?.length > 0 &&
                <div className="flex alignItems--center body-copy u-marginTop--20">
                  <span className="u-fontSize--normal u-color--tuna"> {specsToShow.length} results </span>
                  <span className="u-fontSize--normal u-color--dustyGray u-marginLeft--small"> for </span>
                  {tagsToShow?.map((tag, i) => (
                    <span className="u-fontSize--normal activeTag u-marginLeft--small flex alignItems--center" key={`${tag}-${i}`}> {tag} <span className="icon gray-x-icon u-cursor--pointer u-marginLeft--small" onClick={() => this.onCloseTagFilter(tag)} /> </span>
                  ))}
                </div>
              }
              {categoryToShow === "" && tagsToShow.length === 0 ?
                specJson?.categories?.map((category, i) => {
                  const categorySpecs = specJson?.specs?.filter(spec => category.name === spec.category);
                  return (
                    <ExploreInfo name={category.display} specs={categorySpecs} isMobile={isMobile} infoKey={`${category.name}-${i}`} key={`${category.name}-${i}`} />
                  )
                })
                :
                tagsToShow.length > 0 ?
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {specsToShow?.map((spec, i) => (
                      <Link to={`/spec/${spec.id}`} className={`${isMobile ? "InfoMobile--item" : "Info--item"}  flex alignItems--center`} key={`${spec.id}-${i}`}>
                        <span className={`category-icon`} style={{ backgroundImage: `url("${spec.iconUri}")`}}> </span>
                        <div className="flex-column u-marginLeft--12">
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {spec.title} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {spec.description} </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  :
                  <ExploreInfo name={Utilities.titleize(categoryToShow.replace(/_/gi, " "))} specs={specJson?.specs?.filter(spec => categoryToShow === spec.category)} isMobile={isMobile} />
              }
            </div>
          </div>
        </div>
        {isMobile ? (
          <MobileExploreFilters
            className="MobileNavBar"
            categoryToShow={categoryToShow}
            tagsToShow={tagsToShow}
            showingCategoryDetails={this.showingCategoryDetails}
            onCloseCategory={this.onCloseCategory}
            categoryItems={specJson?.categories}
            tagItems={specJson?.tags}
            showingTagFilter={this.showingTagFilter}
            onCloseTagFilter={this.onCloseTagFilter}
            isOpen={this.state.mobileFiltersOpen}
            onClose={this.onMobileFiltersClick}
          />
        ) : null}
      </div>
    );
  }
}

export default ExploreSpec;
