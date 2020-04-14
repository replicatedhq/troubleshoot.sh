import * as React from "react";
import { Link } from "gatsby";

import titleize from "../utils/utilities";
import "../scss/components/ExploreSpec.scss";
import ExploreInfo from "./shared/ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";

class ExploreSpec extends React.Component {
  state = {
    categoryToShow: "",
    showTagsList: false,
    showMobileFilters: false,
    mobileFiltersOpen: false,
    tagsToShow: [],
    query: ""
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
    import("../../static/specs-gen.json").then(module => {
      this.setState({ specJson: module });
    });

    if (this.props.tag) {
      this.setState({ tagsToShow: [...this.state.tagsToShow, this.props.tag]})
    }
  }

  searchInSpecs = (spec, searchQuery) => {
    return spec.title.toUpperCase().includes(searchQuery.toUpperCase()) ||
      spec.category.toUpperCase().includes(searchQuery.toUpperCase()) ||
      spec.description.toUpperCase().includes(searchQuery.toUpperCase())
  }

  doesCategoryExistInSearch = (allSpecs, category, searchQuery) => {
    return !!allSpecs.find(spec => spec.category === category.name && this.searchInSpecs(spec, searchQuery));
  }

  onSearch = (e) => {
    const query = e.target.value
    this.setState({ query })
  }

  renderSpecs = (categoriesToShow, filteredCategoriesToShow, filteredTagsToShow) => {
    const { specJson, categoryToShow, tagsToShow, query } = this.state;
    const { isMobile } = this.props;

    
    if (categoryToShow === "" && tagsToShow.length === 0) {
      if (categoriesToShow?.length > 0) {
        return categoriesToShow?.map((category, i) => {
          const categorySpecs = specJson?.specs?.filter(spec => (category.name === spec.category) && this.searchInSpecs(spec, query));
          return (
            <ExploreInfo name={category.display} specs={categorySpecs} isMobile={isMobile} infoKey={`${category.name}-${i}`} key={`${category.name}-${i}`} />
          )
        })
      } else {
        return (
          <div className="flex alignItems--center body-copy u-marginTop--20">
            <span className="u-fontSize--normal u-color--tuna"> {categoriesToShow?.length} results </span>
            <span className="u-fontSize--normal u-color--dustyGray u-marginLeft--small"> for </span>
            <span className="u-fontSize--normal activeTag u-marginLeft--small"> {query} </span>
          </div>
        )
      }
    } else if (filteredCategoriesToShow?.length > 0) {
      return (
        <ExploreInfo name={titleize(categoryToShow.replace(/_/gi, " "))} specs={filteredCategoriesToShow} isMobile={isMobile} />
      )
    } else if (tagsToShow.length > 0) {
      return (
      <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
        {filteredTagsToShow?.map((spec, i) => (
          <Link to={`/spec/${spec.slug}`} className={`${isMobile ? "InfoMobile--item" : "Info--item"}  flex alignItems--center`} key={`${spec.id}-${i}`}>
            <span className={`category-icon`} style={{ backgroundImage: `url("${spec.iconUri}")` }}> </span>
            <div className="flex-column u-marginLeft--12">
              <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {spec.title} </p>
              <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {spec.description} </p>
            </div>
          </Link>
        ))}
      </div>
      )
    } else {
      return (
        <div className="flex alignItems--center body-copy u-marginTop--20">
          <span className="u-fontSize--normal u-color--tuna"> {filteredCategoriesToShow?.length} results </span>
          <span className="u-fontSize--normal u-color--dustyGray u-marginLeft--small"> for </span>
          <span className="u-fontSize--normal activeTag u-marginLeft--small"> {query} </span>
        </div>
      )
    }
  }


  render() {
    const { categoryToShow, showTagsList, tagsToShow, specJson, query } = this.state;
    const { isMobile } = this.props;

    const filteredTagsToShow = specJson?.specs?.filter(spec => tagsToShow?.find(tag => spec.tags.includes(tag)) && this.searchInSpecs(spec, query));
    const categoriesToShow = specJson?.categories.filter(category => this.doesCategoryExistInSearch(specJson?.specs, category, query));
    const filteredCategoriesToShow = specJson?.specs?.filter(spec => (categoryToShow === spec.category) && this.searchInSpecs(spec, query));


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
                <div className="flex-column u-width--220">
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginBottom--10 u-padding--10"> Categories </p>
                  {specJson?.categories?.map((category, i) => (
                    <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy flex alignItems--center justifyContent--spaceBetween ${category.name === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category.name, e)} key={`${category.name}-${i}`}>
                      {category.display}
                      {category.name === categoryToShow && <span className="icon white-x-icon u-marginLeft--10" onClick={this.onCloseCategory} />}
                    </p>
                  ))}
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10" onClick={() => this.toggleTags()}> Tags <span className={`icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small ${this.state.showTagsList && "expanded"}`} /> </p>
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
                  <div className="SearchBox--wrapper">
                    <span className="SearchBox-SearchIcon"></span>
                    <input className="SearchBox-input"
                      type="text"
                      value={query}
                      onChange={this.onSearch}
                      placeholder={"What type of spec do you need?"}
                    />
                  </div>
                </div>
              </div>
              {isMobile && <div className="flex flex-column u-marginTop--20">
                <button className="Button secondary" onClick={() => this.onMobileFiltersClick()}> Filters </button>
              </div>}
              {tagsToShow?.length > 0 &&
                <div className="flex alignItems--center body-copy u-marginTop--20">
                  <span className="u-fontSize--normal u-color--tuna"> {filteredTagsToShow?.length} results </span>
                  <span className="u-fontSize--normal u-color--dustyGray u-marginLeft--small"> for </span>
                  {tagsToShow?.map((tag, i) => (
                    <span className="u-fontSize--normal activeTag u-marginLeft--small flex alignItems--center" key={`${tag}-${i}`}> {tag} <span className="icon gray-x-icon u-cursor--pointer u-marginLeft--small" onClick={() => this.onCloseTagFilter(tag)} /> </span>
                  ))}
                </div>
              }
              {this.renderSpecs(categoriesToShow, filteredCategoriesToShow, filteredTagsToShow)}
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
            categoryItems={specJson.categories}
            tagItems={specJson.tags}
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
