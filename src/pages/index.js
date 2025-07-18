import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import TroubleshootLifecycle from "../components/TroubleshootLifecycle"
import { Link } from "gatsby"
import preflightGif from "../images/preflight.gif"
import supportBundleGif from "../images/support-bundle.gif"

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState("preflight-checks")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToEl = (elId) => {
    const element = document.getElementById(elId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleView = (activeTab) => {
    setActiveTab(activeTab)
  }

  // Logo styling is handled by CSS classes now

  return (
    <Layout title="Troubleshoot.sh" isMobile={isMobile}>
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section landing-header border">
          <div className="container flex justifyContent--center alignItems--center">
            <div style={{ maxWidth: "1280px" }}>
              <div className="u-flexMobileReflow u-marginTop--50 u-paddingBottom--20">
                <div className="flex1 flex-column justifyContent--center left-block">
                  <span className="troubleshoot-logo" id="tblshootLogo"></span>
                  <p className="u-fontSize--24 u-marginTop--30 u-color--biscay u-lineHeight--more u-fontWeight--medium">A kubectl plugin providing diagnostic tools for Kubernetes applications</p>
                  <div className="u-marginTop--30 u-flexMobileReflow two-btn-wrapper">
                    <button className="Button primary flex alignItems--center justifyContent--center" onClick={() => scrollToEl("preflightSection")}>
                      <span>Learn how it works</span>
                    </button>
                    <Link to="/docs" className="Button secondary flex alignItems--center justifyContent--center">
                      <span>Get started</span>
                    </Link>
                  </div>
                </div>
                <div className="flex1 right-block">
                  <img src={activeTab === "preflight-checks" ? preflightGif : supportBundleGif} width={"100%"} alt="Troubleshoot Demo" />
                  <div className="flex two-btn-wrapper justifyContent--center alignItems--center u-marginTop--10">
                    <button 
                      className={`landing-page-tab u-marginRight--30 ${activeTab === "preflight-checks" && "is-active-tab"}`} 
                      onClick={() => toggleView("preflight-checks")}
                      onKeyDown={(e) => e.key === 'Enter' && toggleView("preflight-checks")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    > 
                      Preflight checks 
                    </button>
                    <button 
                      className={`landing-page-tab ${activeTab === "support-bundle" && "is-active-tab"}`} 
                      onClick={() => toggleView("support-bundle")}
                      onKeyDown={(e) => e.key === 'Enter' && toggleView("support-bundle")}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    > 
                      Support bundle 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section border">
          <div className="container">
            <div className="contain-700">
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium">Codify your support analysis to run offline and enable your customers to self-remediate</p>
            </div>
            <div className="contain-1280 flex">
              <div className="troubleshoot-lifecycle-container u-marginTop--30 u-position--relative">
                <TroubleshootLifecycle isMobile={isMobile} />
              </div>
            </div>
          </div>
        </div>

        <div className="section gradient border" id="preflightSection">
          <div className="container">
            <div className="contain-700">
              <span className="icon preflight-checks-small-icon" />
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium u-marginTop--30">Validate an environment before an application is installed to&nbsp;prevent common errors</p>
            </div>
            <div className="contain-1280">
              <div className="u-flexMobileReflow u-marginTop--50 u-paddingBottom--20">
                <div className="flex1 left-block next-step-arrow">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon analyze-icon-large"><span className="illustration-text">Analyze</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Without installing anything to the cluster, Preflight analyzes the environment, comparing it to your requirements.</p>
                    <Link to="/docs/analyze/" className="u-fontSize--small link">Explore analyzers</Link>
                  </div>
                </div>
                <div className="flex1 right-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon report-icon-large"><span className="illustration-text">Report</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">A visual report is generated to highlight where the environment doesn't meet your&nbsp;requirements.</p>
                    <Link to={"/docs/preflight/node-checks/#executing-the-preflights"} className="u-fontSize--small link">Learn more about reporting</Link>
                  </div>
                </div>
              </div>
              <div className="u-marginTop--50">
                <div className="contain-1280">
                  <div className="u-marginTop--40 u-flexMobileReflow two-btn-wrapper justifyContent--center">
                    <Link to="/docs/preflight/introduction/" className="Button secondary">Get started writing Preflight Checks</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section gradient" id="supportSection">
          <div className="container">
            <div className="contain-700">
              <span className="icon support-bundle-small-icon" />
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium u-marginTop--30">When something isn't working right, eliminate the back and forth, async debugging by collecting everything at once</p>
            </div>
            <div className="contain-1280">
              <div className="u-flexMobileReflow u-marginTop--50">
                <div className="flex1 left-block more next-step-arrow">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon collect-icon-large"><span className="illustration-text">Collect</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Without installing anything in to the cluster, data is collected from your application based on what was defined in your collector.</p>
                    <Link to="/docs/collect/" className="u-fontSize--small link">Explore collectors</Link>
                  </div>
                </div>
                <div className="flex1 next-step-arrow center-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon redact-icon-large"><span className="illustration-text">Redact</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Sensitive information is redacted from a support bundle and is never stored, keeping your data safe and secure.</p>
                    <Link to="/docs/redact/" className="u-fontSize--small link">Learn about redacting</Link>
                  </div>
                </div>
                <div className="flex1 right-block more">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon analyze-icon-large"><span className="illustration-text">Analyze</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Without installing anything to the cluster, your Support bundle is analyzed and insights are surfaced to help you debug and resolve issues.</p>
                    <Link to="/docs/analyze/" className="u-fontSize--small link">Explore analyzers</Link>
                  </div>
                </div>
              </div>
              <div className="u-marginTop--50">
                <div className="contain-1280">
                  <div className="u-marginTop--40 u-flexMobileReflow two-btn-wrapper justifyContent--center">
                    <Link to="/docs/support-bundle/introduction/" className="Button secondary">Get started writing Support Bundles</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default IndexPage