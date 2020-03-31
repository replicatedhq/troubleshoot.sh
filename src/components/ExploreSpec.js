import * as React from "react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Link } from "@reach/router";

import specJson from "../../specs.json";
import { Utilities } from "../utils/utilities";
import "../scss/components/ExploreSpec.scss";
import ExploreInfo from "./shared/ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";


class ExploreSpec extends React.Component {
  state = {
    categoryToShow: "",
    showTagsList: false,
    showMobileFilters: false,
    mobileFiltersOpen: false,
    tagToShow: ""
  }

  showingCategoryDetails = (category, e) => {
    if (!e.target.classList.contains("close")) {
      this.setState({ categoryToShow: category, tagToShow: "" });
    }
  }

  showingTagFilter = (tag, e) => {
    if (!e.target.classList.contains("icon") && (!e.target.classList.contains("close"))) {
      this.setState({ tagToShow: tag, categoryToShow: "" });
    }
  }

  onCloseCategory = () => {
    this.setState({ categoryToShow: "" });
  }

  onCloseTagFiler = () => {
    this.setState({ tagToShow: "" });
  }

  toggleTags = () => {
    this.setState({ showTagsList: !this.state.showTagsList });
  }

  onMobileFiltersClick = () => {
    this.setState({ mobileFiltersOpen: !this.state.mobileFiltersOpen });
  }


  render() {
    const { categoryToShow, showTagsList, tagToShow } = this.state;
    const { isMobile } = this.props;
    const specsToShow = specJson.specs.filter(spec => spec.tags.includes(tagToShow));


    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section u-marginTop--50 gradient border justifyContent--center alignItems--center">
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
                  {specJson.categories.map((category, i) => (
                    <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy ${category.name === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category.name, e)} key={`${category.name}-${i}`}>
                      {category.display}
                      {category.name === categoryToShow && <span className="close" onClick={this.onCloseCategory}>x</span>}
                    </p>
                  ))}
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10" onClick={() => this.toggleTags()}> Tags <span className="icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small"> </span> </p>
                  {showTagsList ?
                    specJson.tags.map((tag, i) => (
                      <p className={`List--item  u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 body-copy ${tag === tagToShow && "is-active"}`} onClick={(e) => this.showingTagFilter(tag, e)} key={`${tag}-${i}`}>
                        {tag}
                        {tag === tagToShow && <span className="close" onClick={this.onCloseTagFiler}>x</span>}
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
                  <InstantSearch
                    indexName="test"
                    searchClient={"test"}
                  >
                    <div className="ais-SearchBox-wrapper">
                      <SearchBox className="u-marginBottom--most"
                        translations={{
                          placeholder: "What type of spec do you need?",
                        }}
                      />
                      <span className="ais-SearchBox-SearchIcon" />
                    </div>
                    <Hits />
                  </InstantSearch>
                </div>
              </div>
              {isMobile && <div className="flex flex-column u-marginTop--20">
                <button className="Button secondary" onClick={() => this.onMobileFiltersClick()}> Filters </button>
              </div>}
              {tagToShow &&
                <div className="flex alignItems--center body-copy u-marginTop--20">
                  <span className="u-fontSize--normal u-color--tuna"> {specsToShow.length} results </span>
                  <span className="u-fontSize--normal u-color--dustyGray u-marginLeft--small"> for </span>
                  <span className="u-fontSize--normal activeTag u-marginLeft--small"> {tagToShow} <span className="icon gray-x-icon u-cursor--pointer" onClick={this.onCloseTagFiler} /> </span>
                </div>
              }
              {categoryToShow === "" && tagToShow === "" ?
                specJson.categories.map((category, i) => {
                  const categorySpecs = specJson.specs.filter(spec => category.name === spec.category);
                  return (
                    <ExploreInfo name={category.display} specs={categorySpecs} isMobile={isMobile} infoKey={`${category.name}-${i}`} />
                  )
                })
                :
                tagToShow ?
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {specsToShow.map((spec, i) => (
                      <Link to={`/spec/${spec.id}`} className="Info--item flex alignItems--center" key={`${spec.id}-${i}`}>
                        <span className="category-icon" style={{ backgroundImage: `url(${spec.iconUri})` }} />
                        <div className="flex-column u-marginLeft--12">
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {spec.title} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {spec.description} </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  :
                  <ExploreInfo name={Utilities.titleize(categoryToShow.replace(/_/gi, " "))} specs={specJson.specs.filter(spec => categoryToShow === spec.category)} isMobile={isMobile} />
              }
            </div>
          </div>
        </div>
        {isMobile ? (
          <MobileExploreFilters
            className="MobileNavBar"
            categoryToShow={categoryToShow}
            showingCategoryDetails={this.showingCategoryDetails}
            onCloseCategory={this.onCloseCategory}
            categoryItems={specJson.categories}
            tagItems={specJson.tags}
            isOpen={this.state.mobileFiltersOpen}
            onClose={this.onMobileFiltersClick}
          />
        ) : null}
      </div>
    );
  }
}

export default ExploreSpec;
