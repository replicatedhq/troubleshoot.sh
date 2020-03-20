import * as React from "react";
import "../scss/components/Troubleshootsh.scss";

class Troubleshootsh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    
  }

  render() {
    // const { isMobile } = this.props;
    return (
      <div className={`u-minHeight--full u-width--full u-overflow--auto flex-column flex1 u-marginBottom---40`}>
        <div className="section landing-header border">
          <div className="container">
            <div className="contain-700">
              <span style={{ width: `489px`, height: `47px` }} className="troubleshoot-logo"></span>
              <p className="u-fontSize--24 u-marginTop--30 u-color--biscay u-lineHeight--more u-fontWeight--medium">Disconnected remote support and validation for Kubernetes applications</p>
              <div className="u-marginTop--30">
                <button className="Button secondary u-marginRight--30"><span className="icon preflight-small"></span>Explore preflight</button>
                <button className="Button secondary"><span className="icon support-small"></span>Explore support</button>
              </div>
            </div>
          </div>
        </div>

        <div className="section gradient border">
          <div className="container">
            <div className="contain-700">
              <p className="u-fontSize--24 u-color--biscay u-lineHeight--more u-fontWeight--medium">Validate an environment before an application is installed to&nbsp;prevent common errors</p>
            </div>
            <div className="flex">
              <div className="flex1">
                <div className="icon analyze-icon-large"><span>Analyze</span></div>
                <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">Without installing anything to the cluster, Preflight analyzes  the environment, comparing it to your requirements.</p>
                <a className="u-fontSize--small link">Explore analyzer specs</a>
              </div>
              <div className="flex1">
                <div className="icon report-icon-large"><span>Report</span></div>
                <p className="u-fontSize--large u-color--dustyGray u-lineHeight--more u-marginBottom--20 u-marginTop--20 body-copy">A visual report is generated to highlight where the environment doesn’t meet your requirements.</p>
                <a className="u-fontSize--small link">Learn more about reporting</a>
              </div>
            </div>
          </div>
        </div>

        <div className="section gradient border">
          <div className="container">
            <div className="contain-700">
              <p>When something isn’t working right, eliminate the back and forth, async debugging by collecting everything at once</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Troubleshootsh;
