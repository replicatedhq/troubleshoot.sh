import * as React from "react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import specJson from "../../specs.json";

import "../scss/components/ExploreSpec.scss";
import ExploreInfo from "./shared/ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";


class ExploreSpec extends React.Component {
  state = {
    categoryToShow: "",
    showTagsList: false,
    showMobileFilters: false,
    mobileFiltersOpen: false
  }

  showingCategoryDetails = (category, e) => {
    if (!e.target.classList.contains("close")) {
      this.setState({ categoryToShow: category });
    }
  }

  onCloseCategory = () => {
    this.setState({ categoryToShow: "" });
  }

  toggleTags = () => {
    this.setState({ showTagsList: !this.state.showTagsList });
  }

  onMobileFiltersClick = () => {
    this.setState({ mobileFiltersOpen: !this.state.mobileFiltersOpen });
  }


  render() {
    const { categoryToShow, showTagsList } = this.state;
    const { isMobile } = this.props;

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
                  {specJson.categories.map((category, i) => {
                    return (
                      <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy ${category.display === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category.display, e)} key={`${category.display}-${i}`}>
                        {category.display}
                        {category.display === categoryToShow && <span className="close" onClick={this.onCloseCategory}>x</span>}
                      </p>
                    )
                  })}
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10" onClick={() => this.toggleTags()}> Tags <span className="icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small"> </span> </p>
                  {showTagsList ?
                    specJson.tags.map((tag, i) => {
                      return (
                        <p className="List--item  u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 body-copy" key={`${tag}-${i}`}> {tag} </p>
                      )
                    })
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
              {categoryToShow === "" ?
                specJson.categories.map(category => {
                  const categorySpecs = specJson.specs.filter(spec => category.name === spec.category);
                  return (
                    <ExploreInfo name={category.display} specs={categorySpecs} isMobile={isMobile} />
                  )
                })
                : 
                categoryToShow === "Cluster information" ?
                  <ExploreInfo name={"Cluster information"} specs={specJson.specs.filter(spec => "cluster_information" === spec.category)} isMobile={isMobile} />
                  : categoryToShow === "Database" ?
                    <ExploreInfo name={"Database"} specs={specJson.specs.filter(spec => "database" === spec.category)} isMobile={isMobile} />
                    : categoryToShow === "Storage" ?
                      <ExploreInfo name={"Storage"} specs={specJson.specs.filter(spec => "storage" === spec.category)} isMobile={isMobile} />
                      : categoryToShow === "Networking" ?
                        <ExploreInfo name={"Networking"} specs={specJson.specs.filter(spec => "networking" === spec.category)} isMobile={isMobile} />
                        : categoryToShow === "Performance" ?
                          <ExploreInfo name={"Performance"} specs={specJson.specs.filter(spec => "performance" === spec.category)}isMobile={isMobile} />
                          : categoryToShow === "Cloud provider" ?
                            <ExploreInfo name={"Cloud provider"} specs={specJson.specs.filter(spec => "cloud_provider" === spec.category)} isMobile={isMobile} />
                            : categoryToShow === "External app dependencies" ?
                              <ExploreInfo name={"External app dependencies"} specs={specJson.specs.filter(spec => "external_app_dependencies" === spec.category)} isMobile={isMobile} />
                              : null
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
