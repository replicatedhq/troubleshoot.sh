import React from "react"
import Layout from "../components/Layout"

const ExplorePage = () => {
  return (
    <Layout title="Explore categories">
      <div className="u-width--full u-overflow--auto flex-column flex1">
        {/* Hero Section */}
        <div className="section border">
          <div className="container">
            <div className="contain-700">
              <h1 className="u-fontSize--header2 u-marginBottom--20 u-color--biscay">
                Explore categories
              </h1>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more">
                Learn more about Replicated to operationalize your application
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="section">
          <div className="container">
            <div className="contain-1280">
              
              {/* Search and Filters Placeholder */}
              <div className="u-background--alabaster u-padding--30 u-borderRadius--8 u-marginBottom--50 u-textAlign--center">
                <h2 className="u-color--tuna u-marginBottom--20">
                  🔍 Spec Explorer Coming Soon
                </h2>
                <p className="u-color--dustyGray u-marginBottom--30 body-copy">
                  We're building an interactive explorer to help you discover and learn from 
                  community troubleshoot specifications.
                </p>
                
                {/* Feature Preview */}
                <div className="u-flexMobileReflow" style={{ gap: "2rem", justifyContent: "center" }}>
                  <div className="flex-column" style={{ maxWidth: "200px" }}>
                    <span className="icon preflight-checks-small-icon u-marginBottom--15"></span>
                    <h3 className="u-fontSize--large u-color--biscay u-marginBottom--10">Preflight Checks</h3>
                    <p className="u-fontSize--normal u-color--dustyGray body-copy">Browse validation specs</p>
                  </div>
                  <div className="flex-column" style={{ maxWidth: "200px" }}>
                    <span className="icon support-bundle-small-icon u-marginBottom--15"></span>
                    <h3 className="u-fontSize--large u-color--biscay u-marginBottom--10">Support Bundles</h3>
                    <p className="u-fontSize--normal u-color--dustyGray body-copy">Explore collection specs</p>
                  </div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="u-textAlign--center u-marginBottom--50">
                <h2 className="u-fontSize--header u-color--biscay u-marginBottom--30">
                  Expand pre and post-installation diagnostic capabilities
                </h2>
                <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--40 body-copy">
                  Explore example Collectors and Analyzers. All of these examples are editable and include a command for you to securely try in your cluster.
                </p>
              </div>

              {/* Categories Placeholder */}
              <div className="u-flexMobileReflow" style={{ gap: "2rem", justifyContent: "center" }}>
                <div className="u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5", minWidth: "250px" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Categories</h3>
                  <p className="u-fontSize--normal u-color--dustyGray body-copy">Filter by category type</p>
                </div>
                <div className="u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5", minWidth: "250px" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Tags</h3>
                  <p className="u-fontSize--normal u-color--dustyGray body-copy">Filter by tags</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contributed Section */}
        <div className="section gradient">
          <div className="container">
            <div className="contain-700">
              <p className="u-fontSize--normal u-color--dustyGray u-textAlign--center body-copy">
                Contributed by Replicated
              </p>
              <div className="u-textAlign--center u-marginTop--20">
                <a href="https://github.com/replicatedhq/troubleshoot.sh" target="_blank" rel="noopener noreferrer" className="link">
                  <span className="icon github-icon"></span>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ExplorePage