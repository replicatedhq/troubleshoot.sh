import * as React from "react";
import { navigate } from "gatsby";
import isEmpty from "lodash/isEmpty";

import ExploreInfo from "./ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";
import ExploreCard from "./ExploreCard";
import { titleize } from "../utils/utilities";

import "../scss/components/ExploreSpec.scss";

class ExploreSpec extends React.Component {
  state = {
    categoryToShow: "",
    showTagsList: false,
    showMobileFilters: false,
    mobileFiltersOpen: false,
    tagsToShow: [],
    query: "",
    queryStringTag: "",
    queryStringCategory: ""
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
        this.setState({
          tagsToShow: [...this.state.tagsToShow, tag],
          categoryToShow: ""
        });
      }
    }
  }

  onCloseCategory = () => {
    this.setState({ categoryToShow: "" }, () => {
      navigate("/explore");
    });
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

  componentDidUpdate(lastProps, lastState) {
    if (this.state.tagsToShow !== lastState.tagsToShow && this.state.tagsToShow) {
      if (this.state.tagsToShow.length > 1) {
        this.setState({ queryStringTag: this.state.tagsToShow.toString().split(",").join("&tag=") }, () => {
          navigate(`/explore?tag=${this.state.queryStringTag}`)
        })
      } else if (isEmpty(this.state.categoryToShow)) {
        this.setState({ queryStringTag: this.state.tagsToShow.toString() }, () => {
          if (this.state.queryStringTag === "") {
            navigate("/explore")
          } else {
            navigate(`/explore?tag=${this.state.queryStringTag}`, { replace: true })
          }
        })
      }
    }

    if (this.state.categoryToShow !== lastState.categoryToShow && this.state.categoryToShow) {
      this.setState({ queryStringCategory: this.state.categoryToShow }, () => {
        navigate(`/explore?category=${this.state.queryStringCategory}`)
      })
    }
  }

  componentDidMount() {
    import("../../static/specs-gen.json").then(module => {
      this.setState({ specJson: module });
    });

    if (this.props.tag) {
      if (Array.isArray(this.props.tag)) {
        this.setState({
          tagsToShow: [...this.state.tagsToShow, ...this.props.tag],
          showTagsList: true
        })
      } else {
        this.setState({
          tagsToShow: [...this.state.tagsToShow, this.props.tag],
          showTagsList: true
        })
      }
    }

    if (this.props.category) {
      this.setState({
        categoryToShow: this.props.category
      })
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
        <ExploreInfo name={titleize(categoryToShow.replace(/_/gi, " "))} specs={filteredCategoriesToShow} isMobile={isMobile} infoKey={`${categoryToShow}`} />
      )
    } else if (tagsToShow.length > 0) {
      return (
        <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
          {filteredTagsToShow?.map((spec, i) => (
            <ExploreCard name={titleize(spec.category.replace(/_/gi, " "))} spec={spec} i={i} isMobile={isMobile} key={`${spec.category.name}-${i}`} />
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
        <div className="section gradient border justifyContent--center alignItems--center" style={{ marginTop: "120px" }}>
          <div className="container">
            <p className="u-fontSize--jumbo u-fontWeight--bold u-color--biscay u-lineHeight--more">Expand pre and post-installation diagnostic capabilities</p>
            <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy">Explore example Collectors and Analyzers. All of these examples are editable and include a command for you to securely try in your cluster.</p>
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
                      placeholder={"What type of data do you want to collect and analyze?"}
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
