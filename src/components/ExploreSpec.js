import * as React from "react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import "../scss/components/ExploreSpec.scss";
import ExploreInfo from "./shared/ExploreInfo";
import MobileExploreFilters from "./MobileExploreFilters";

const clusterInfo = [
  { name: "Kubernetes", description: "Validate that at least n nodes in the cluster have GPU support" },
  { name: "Kubernetes", description: "Kubernetes version" },
  { name: "Kubernetes", description: "Number of nodes" },
  { name: "Kubernetes", description: "Distribution / Managed K8s" },
  { name: "Kubernetes", description: "Supported container runtime" },
  { name: "Kubernetes", description: "Validate that sufficient CPU and memory are available for scheduling" },
  { name: "Kubernetes", description: "All nodes are ready / node status" }
];

const databaseInfo = [
  { name: "Postgres connection string", description: "Validate that the connection string is valid" },
  { name: "Postgres connection string", description: "Validate that the postgres version is supported" },
  { name: "MySQL connection string", description: "Validate that the connection string is valid" },
  { name: "MySQL connection string", description: "Validate that the MySQL version is supported" }
];

const storageInfo = [
  { name: "Storage", description: "Validate that a storage class exists" },
  { name: "Rook", description: "Validate that Rook / Ceph have a quorum" },
  { name: "OpenEBS", description: "Validate OpenEBS" },
  { name: "Disk", description: "Validate that disk capacity exceeds n (limit ranges allow for PVC creation)" },
  { name: "Rook", description: "How to debug Rook" }
];

const networkingInfo = [
  { name: "Kubernetes", description: "Validate there is an ingress controller" },
  { name: "Kubernetes", description: "Can support a Load Balancer" },
  { name: "Kubernetes", description: "NodePort is available" },
  { name: "Kubernetes", description: "Verify that a TLS secret exists, is valid" }
];

const cloudProviderInfo = [
  { name: "Amazon S3", description: "Verify that an S3 bucket exists and is readable/writeable" },
  { name: "Amazon S3", description: "Verify that the IAM instance role has n permissions" },
  { name: "Cloud provider", description: "Verify that the cluster is running in a specific cloud provider (managed or not)" }
]

const performanceInfo = [
  { name: "Kubernetes", description: "Validate that pod to pod networking bandwidth " },
];

const externalAppInfo = [
  { name: "GitHub", description: "Verify that a GitHub app / key / secret are valid" },
  { name: "GitLab", description: "Verify that a GitLab app / key / secret are valid" },
  { name: "Salesforce", description: "Validate a Salesforce Key is valid" },
];


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
    const categories = ["Database", "Cloud provider", "External app dependecies", "Cluster information", "Storage", "Performance", "Networking"];
    const tags = ["database", "connection", "storage", "networking", "kubernetes", "performance", "cloud", "s3", "postgres", "mysql", "cluster", "pods"];

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
                  {categories.map((category, i) => {
                    return (
                      <p className={`List--item u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal body-copy ${category === categoryToShow && "is-active"}`} onClick={(e) => this.showingCategoryDetails(category, e)} key={`${category}-${i}`}>
                        {category}
                        {category === categoryToShow && <span className="close" onClick={this.onCloseCategory}>x</span>}
                      </p>
                    )
                  })}
                  <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50 flex alignItems--center u-cursor--pointer u-marginBottom--10 u-padding--10" onClick={() => this.toggleTags()}> Tags <span className="icon clickable gray-expand-icon u-marginLeft--small u-marginTop--small"> </span> </p>
                  {showTagsList ?
                    tags.map((tag, i) => {
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
                <div>
                  <ExploreInfo name={"Cluster information"} infos={clusterInfo} isMobile={isMobile} />
                  <ExploreInfo name={"Database"} infos={databaseInfo} isMobile={isMobile} />
                  <ExploreInfo name={"Storage"} infos={storageInfo} isMobile={isMobile} />
                  <ExploreInfo name={"Networking"} infos={networkingInfo} isMobile={isMobile} />
                  <ExploreInfo name={"Performance"} infos={performanceInfo} isMobile={isMobile} />
                  <ExploreInfo name={"Cloud provider"} infos={cloudProviderInfo} isMobile={isMobile} />
                  <ExploreInfo name={"External app dependecies"} infos={externalAppInfo} isMobile={isMobile} />
                </div>
                : categoryToShow === "Cluster information" ?
                  <ExploreInfo name={"Cluster information"} infos={clusterInfo} isMobile={isMobile} />
                  : categoryToShow === "Database" ?
                    <ExploreInfo name={"Database"} infos={databaseInfo} isMobile={isMobile} />
                    : categoryToShow === "Storage" ?
                      <ExploreInfo name={"Storage"} infos={storageInfo} isMobile={isMobile} />
                      : categoryToShow === "Networking" ?
                        <ExploreInfo name={"Networking"} infos={networkingInfo} isMobile={isMobile} />
                        : categoryToShow === "Performance" ?
                          <ExploreInfo name={"Performance"} infos={performanceInfo} isMobile={isMobile} />
                          : categoryToShow === "Cloud provider" ?
                            <ExploreInfo name={"Cloud provider"} infos={cloudProviderInfo} isMobile={isMobile} />
                            : categoryToShow === "External app dependecies" ?
                              <ExploreInfo name={"External app dependecies"} infos={externalAppInfo} isMobile={isMobile} />
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
            categoryItems={categories}
            tagItems={tags}
            isOpen={this.state.mobileFiltersOpen}
            onClose={this.onMobileFiltersClick}
          />
        ) : null}
      </div>
    );
  }
}

export default ExploreSpec;
