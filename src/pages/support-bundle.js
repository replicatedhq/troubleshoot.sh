import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

const SupportBundlePage = () => {
  return (
    <Layout title="Try troubleshoot specs">
      <div className="u-width--full u-overflow--auto flex-column flex1">
        {/* Hero Section */}
        <div className="section landing-header border">
          <div className="container">
            <div className="contain-700">
              <span className="icon support-bundle-small-icon u-marginBottom--20"></span>
              <h1 className="u-fontSize--header2 u-color--biscay u-marginBottom--30">
                Support Bundles
              </h1>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--40 body-copy">
                Collect comprehensive diagnostic information from customer environments. 
                Debug faster with automated data collection and analysis.
              </p>
              <div className="two-btn-wrapper justifyContent--center">
                <Link to="/docs/support-bundle/introduction/" className="Button primary">
                  Get Started
                </Link>
                <a 
                  href="https://github.com/replicatedhq/troubleshoot/tree/main/examples/support-bundle"
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
                <div className="flex1 left-block more next-step-arrow">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon collect-icon-large">
                      <span className="illustration-text">Collect</span>
                    </div>
                  </div>
                  <div className="u-textAlign--left">
                    <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Data Collection</h3>
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 body-copy">
                      Without installing anything in to the cluster, data is collected from your application based on what was defined in your collector.
                    </p>
                    <Link to="/docs/collect/" className="u-fontSize--small link">Explore collectors</Link>
                  </div>
                </div>
                <div className="flex1 next-step-arrow center-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon redact-icon-large">
                      <span className="illustration-text">Redact</span>
                    </div>
                  </div>
                  <div className="u-textAlign--left">
                    <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Data Redaction</h3>
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 body-copy">
                      Sensitive information is redacted from a support bundle and is never stored, keeping your data safe and secure.
                    </p>
                    <Link to="/docs/redact/" className="u-fontSize--small link">Learn about redacting</Link>
                  </div>
                </div>
                <div className="flex1 right-block more">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon analyze-icon-large">
                      <span className="illustration-text">Analyze</span>
                    </div>
                  </div>
                  <div className="u-textAlign--left">
                    <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Analysis</h3>
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 body-copy">
                      Without installing anything to the cluster, your Support bundle is analyzed and insights are surfaced to help you debug and resolve issues.
                    </p>
                    <Link to="/docs/analyze/" className="u-fontSize--small link">Explore analyzers</Link>
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
                Example Support Bundle Specs
              </h2>
            </div>
            <div className="contain-1280">
              <div className="u-flexMobileReflow" style={{ gap: "2rem" }}>
                
                {/* Logs Collection */}
                <div className="flex1 u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Application Logs</h3>
                  <p className="u-fontSize--normal u-color--dustyGray u-marginBottom--20 body-copy">
                    Collect logs from your application pods and system components.
                  </p>
                  <code className="u-fontSize--small u-color--tundora" style={{ 
                    backgroundColor: "#f8f8f8", 
                    padding: "0.5rem", 
                    borderRadius: "4px",
                    display: "block"
                  }}>
                    kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/examples/support-bundle/sample-supportbundle.yaml
                  </code>
                </div>

                {/* Cluster Info */}
                <div className="flex1 u-background--white u-padding--30 u-borderRadius--8" style={{ border: "1px solid #e5e5e5" }}>
                  <h3 className="u-fontSize--largest u-color--biscay u-marginBottom--15">Cluster Information</h3>
                  <p className="u-fontSize--normal u-color--dustyGray u-marginBottom--20 body-copy">
                    Gather cluster configuration, resources, and status information.
                  </p>
                  <code className="u-fontSize--small u-color--tundora" style={{ 
                    backgroundColor: "#f8f8f8", 
                    padding: "0.5rem", 
                    borderRadius: "4px",
                    display: "block"
                  }}>
                    kubectl support-bundle https://support-bundle.replicated.com
                  </code>
                </div>

              </div>
              
              <div className="u-textAlign--center u-marginTop--50">
                <Link to="/docs/support-bundle/introduction/" className="Button secondary">
                  Get started writing Support Bundles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SupportBundlePage