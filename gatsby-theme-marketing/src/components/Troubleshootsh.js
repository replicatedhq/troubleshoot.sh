import * as React from "react";
import TroubleshootLifecycle from "./TroubleshootLifecycle";
import { Link } from "gatsby";
import preflightGif from "../images/preflight.gif";
import supportBundleGif from "../images/support-bundle.gif";
import "../scss/components/Troubleshootsh.scss";

class Troubleshootsh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "preflight-checks"
    };
  }

  getExampleSpecs = (arr, n) => {
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  scrollToEl = (elId) => {
    const element = document.getElementById(elId);
    element.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    import("../../static/specs-gen.json").then(module => {
      this.setState({ specJson: module });
    });
  }

  toggleView = (activeTab) => {
    this.setState({ activeTab })
  }

  render() {
    const { isMobile } = this.props;
    const logoStyle = isMobile ? { width: `320px`, height: `31px` } : { width: `489px`, height: `47px` };
    const specs = this.state.specJson?.specs || [];

    return (
      <div className={`u-width--full u-overflow--auto flex-column flex1`}>
        <div className="section landing-header border">
          <div className="container flex justifyContent--center alignItems--center">
            <div style={{ maxWidth: "1280px" }}>
              <div className="u-flexMobileReflow u-marginTop--50 u-paddingBottom--20">
                <div className="flex1 flex-column justifyContent--center left-block">
                  <span style={logoStyle} className="troubleshoot-logo" id="tblshootLogo"></span>
                  <p className="u-fontSize--24 u-marginTop--30 u-color--biscay u-lineHeight--more u-fontWeight--medium">A kubectl plugin providing diagnostic tools for Kubernetes applications</p>
                  <div className="u-marginTop--30 u-flexMobileReflow two-btn-wrapper">
                    <button className="Button primary flex alignItems--center justifyContent--center" onClick={() => this.scrollToEl("preflightSection")}>
                      <span>Learn how it works</span>
                    </button>
                    <Link to="/docs" className="Button secondary flex alignItems--center justifyContent--center">
                      <span>Get started</span>
                    </Link>
                  </div>
                </div>
                <div className="flex1 right-block">
                  <img src={this.state.activeTab === "preflight-checks" ? preflightGif : supportBundleGif} width={"100%"} />
                  <div className="flex two-btn-wrapper justifyContent--center alignItems--center u-marginTop--10">
                    <span className={`landing-page-tab u-marginRight--30 ${this.state.activeTab === "preflight-checks" && "is-active-tab"}`} onClick={() => this.toggleView("preflight-checks")}> Preflight checks </span>
                    <span className={`landing-page-tab ${this.state.activeTab === "support-bundle" && "is-active-tab"}`} onClick={() => this.toggleView("support-bundle")}> Support bundle </span>
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
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Without installing anything to the cluster, Preflight analyzes  the environment, comparing it to your requirements.</p>
                    <Link to="/docs/analyze/" className="u-fontSize--small link">Explore analyzers</Link>
                  </div>
                </div>
                <div className="flex1 right-block">
                  <div className="u-position--relative u-textAlign--center">
                    <div className="icon report-icon-large"><span className="illustration-text">Report</span></div>
                  </div>
                  <div className="u-textAlign--left">
                    <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">A visual report is generated to highlight where the environment doesn’t meet your&nbsp;requirements.</p>
                    <Link to={"/docs/preflight/node-checks/#executing-the-preflights"} className="u-fontSize--small link">Learn more about reporting</Link>
                  </div>
                </div>
              </div>
              <div className="u-marginTop--50">
                <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium">Examples</p>
                <div className="contain-1280">
                  <div className="u-flexTabletReflow u-marginTop--50 justifyContent--center">
                    {specs && specs.length > 0 ? this.getExampleSpecs(specs, 3).map((item, i) => (
                      <div className="example-spec-block-wrapper flex1" key={`${i}-${item.slug}`}>
                        <Link to={`/preflight/${item.slug}`}>
                          <div className="example-spec-block">
                            <p className="u-fontSize--large u-fontWeight--medium u-color--biscay u-lineHeight--default u-marginBottom--10">{item.title}</p>
                            <p className="u-fontSize--normal u-color--dustyGray u-lineHeight--more">{item.description}</p>
                          </div>
                        </Link>
                      </div>
                    )) : null}
                  </div>
                  <div className="u-marginTop--40 u-flexMobileReflow two-btn-wrapper justifyContent--center">
                    <Link to="/explore/" className="Button primary">Browse more examples</Link>
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
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium u-marginTop--30">When something isn’t working right, eliminate the back and forth, async debugging by collecting everything at once</p>
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
                <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium">Examples </p>
                <div className="contain-1280">
                  <div className="u-flexTabletReflow u-marginTop--50 justifyContent--center">
                    {specs && specs.length > 0 ? this.getExampleSpecs(specs, 3).map((item, i) => (
                      <div className="example-spec-block-wrapper flex1" key={`${i}-${item.slug}`}>
                        <Link to={`/support-bundle/${item.slug}`}>
                          <div className="example-spec-block">
                            <p className="u-fontSize--large u-fontWeight--medium u-color--biscay u-lineHeight--default u-marginBottom--10">{item.title}</p>
                            <p className="u-fontSize--normal u-color--dustyGray u-lineHeight--more">{item.description}</p>
                          </div>
                        </Link>
                      </div>
                    )) : null}
                  </div>
                  <div className="u-marginTop--40 u-flexMobileReflow two-btn-wrapper justifyContent--center">
                    <Link to="/explore/" className="Button primary">Browse more examples</Link>
                    <Link to="/docs/support-bundle/introduction/" className="Button secondary">Get started writing Support Bundles</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Troubleshootsh;
