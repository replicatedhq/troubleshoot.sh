import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

const PreflightPage = () => {
  return (
    <Layout title="Try troubleshoot specs">
      <div className="u-width--full u-overflow--auto flex-column flex1">
        {/* Hero Section */}
        <div className="section landing-header border">
          <div className="container">
            <div className="contain-700">
              <span className="icon preflight-checks-small-icon u-marginBottom--20"></span>
              <h1 className="u-fontSize--header2 u-color--biscay u-marginBottom--30">
                Preflight Checks
              </h1>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--40 body-copy">
                Validate your Kubernetes environment before deploying applications. 
                Catch configuration issues early and ensure smooth installations.
              </p>
              <div className="two-btn-wrapper justifyContent--center">
                <Link to="/docs/preflight/introduction/" className="Button primary">
                  Get Started
                </Link>
                <a 
                  href="https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Button secondary"
                >
                  View Examples
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="section border">
          <div className="container">
            <div className="contain-1280">
              <div className="u-flexMobileReflow u-marginTop--50">
                <div className="flex1 left-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon analyze-icon-large">
                      <span className="illustration-text">Analyze</span>
                    </div>
                  </div>
                  <div className="u-textAlign--left">
                    <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Environment Analysis</h3>
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 body-copy">
                      Without installing anything to the cluster, Preflight analyzes the environment, comparing it to your requirements.
                    </p>
                    <Link to="/docs/analyze/" className="u-fontSize--small link">Explore analyzers</Link>
                  </div>
                </div>
                <div className="flex1 right-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon report-icon-large">
                      <span className="illustration-text">Report</span>
                    </div>
                  </div>
                  <div className="u-textAlign--left">
                    <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Visual Reports</h3>
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 body-copy">
                      A visual report is generated to highlight where the environment doesn't meet your requirements.
                    </p>
                    <Link to="/docs/preflight/cli-usage/" className="u-fontSize--small link">Learn more about reporting</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="section gradient">
          <div className="container">
            <div className="contain-700">
              <h2 className="u-fontSize--header u-color--biscay u-marginBottom--30 u-textAlign--center">
                Example Preflight Checks
              </h2>
            </div>
            <div className="contain-1280">
              <div className="u-flexMobileReflow" style={{ gap: "2rem" }}>
                
                {/* Kubernetes Version Check */}
                <div className="flex1 u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Kubernetes Version</h3>
                  <p className="u-fontSize--normal u-color--dustyGray u-marginBottom--20 body-copy">
                    Ensure the cluster is running a supported Kubernetes version.
                  </p>
                  <code className="u-fontSize--small u-color--tundora" style={{ 
                    backgroundColor: "#f8f8f8", 
                    padding: "0.5rem", 
                    borderRadius: "4px",
                    display: "block"
                  }}>
                    kubectl preflight https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/examples/preflight/sample-preflight.yaml
                  </code>
                </div>

                {/* Node Resources Check */}
                <div className="flex1 u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Node Resources</h3>
                  <p className="u-fontSize--normal u-color--dustyGray u-marginBottom--20 body-copy">
                    Verify nodes have sufficient CPU, memory, and storage.
                  </p>
                  <code className="u-fontSize--small u-color--tundora" style={{ 
                    backgroundColor: "#f8f8f8", 
                    padding: "0.5rem", 
                    borderRadius: "4px",
                    display: "block"
                  }}>
                    kubectl preflight https://preflight.replicated.com
                  </code>
                </div>

              </div>
              
              <div className="u-textAlign--center u-marginTop--50">
                <Link to="/docs/preflight/introduction/" className="Button secondary">
                  Get started writing Preflight Checks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PreflightPage