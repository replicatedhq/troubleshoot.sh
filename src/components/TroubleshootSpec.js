import * as React from "react";
import { Link } from "@reach/router";

import Tag from "./shared/Tag";
import CodeSnippet from "./shared/CodeSnippet";

const yaml = `
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: sentry-enterprise
spec:
  collectors:
    - mysql:
        ...
  analyzers
    - mysql
        ...
`
const tags = ["mysql", "database", "connection"];
const preflightCommand = "kubectl preflight https://preflight.com/24gs67";
const bundleCommand = "kubectl supportbundle https://supportbundle.com/24gs67";


class TroubleshootSpec extends React.Component {
  state = {
    showCodeSnippet: false,
    copyingSpecYaml: false,
    copySuccess: "",
    isActive: ""
  }


  renderMonacoEditor = () => {
    import("monaco-editor").then(monaco => {
      window.monacoEditor = monaco.editor.create(document.getElementById("monaco"), {
        value: yaml,
        language: "yaml",
        readOnly: true,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        lineNumbers: "off",
      });
    });
  }

  componentDidMount() {
    this.renderMonacoEditor();
  }

  copySpecYamlToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = yaml;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    this.setState({ copySuccess: "Copied!" });
    setTimeout(() => {
      this.setState({
        copySuccess: false
      });
    }, 3000);
  }

  onTryItOut = (type) => {
    this.setState({ showCodeSnippet: true });

    if (type === "preflight") {
      this.setState({
        currentCommand: preflightCommand,
        isActive: type
      });
    } else {
      this.setState({
        currentCommand: bundleCommand,
        isActive: type
      });
    }
  }

  render() {
    const { copySuccess, showCodeSnippet, currentCommand, isActive } = this.state;
    const { isMobile } = this.props;

    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section landing-header">
          <div className={`${!isMobile ? "flex1" : "flex-column"} container flex justifyContent--center`}>
            <div className="section">
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium"> Validate MySQL connection string </p>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy"> This collector and anlyzer is designed to validate a mysql connection string. </p>
              <div className="MonacoEditor--wrapper flex u-width--full">
                <div className="flex u-width--full u-overflow--hidden" id="monaco">
                </div>
              </div>
              <div className="u-marginTop--30">
                {!copySuccess ?
                  <button className="Button primary blue u-marginRight--30" onClick={this.copySpecYamlToClipboard}>Copy spec YAML</button>
                  : <span className="u-color--vidaLoca u-marginRight--30">{copySuccess}</span>}
                <button className="Button secondary gray"> View RAW on Github </button>
              </div>
            </div>
            <div className={`section ${!isMobile && "u-marginLeft--50"}`}>
              <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium"> Contributors </p>
              <div className="flex u-marginTop--30 u-marginBottom--30">
                <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium flex"> Tags </p>
                <div className="flex flex1 u-marginLeft--12">
                  {tags.map((tag, i) => (<Tag tag={tag} tagKey={`${tag}-${i}`} />))}
                </div>
              </div>

              <div className="u-borderTop--gray u-marginBottom--30">
                <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30"> Try it out </p>
                <p className="u-fontSize--large u-color--dustyGray u-marginTop--small body-copy"> Find select the type of command you want to try</p>
                <div className={`u-marginTop--30 ${isMobile && "flex"}`}>
                  <button className={`Button secondary gray tab ${isActive === "preflight" && "is-active-gray"}`} onClick={() => this.onTryItOut("preflight")}><span className="icon preflight-small"></span>Preflight Check</button>
                  <button className={`Button primary darkBlue tab u-marginLeft--10 ${isActive === "supportbundle" && "is-active-blue"}`} onClick={() => this.onTryItOut("supportbundle")}><span className="icon support-small"></span>Support Bundle</button>
                </div>
                {showCodeSnippet &&
                  <div className="flex flex-column u-marginTop--normal">
                    <CodeSnippet
                      canCopy={true}
                      onCopyText={<span className="u-color--vidaLoca">Command has been copied to your clipboard</span>}
                      learnMore={<a to={""} className="u-color--royalBlue u-lineHeight--normal u-fontSize--small u-textDecoration--underlineOnHover"> Learn more about Support Bundle </a>}
                    >
                      {currentCommand}
                    </CodeSnippet>
                  </div>
                }
              </div>

              <div className="u-borderTop--gray u-marginBottom--15">
                <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30"> Related specs </p>
                <p className="u-fontSize--normal u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--20"> Validate that the mysql version is supported </p>
                <div className="u-marginTop--15 flex flex1 justifyContent--spaceBetween">
                  <Link to={"/explore"} className="u-fontSize--small link"> View spec </Link>
                  <p className="u-fontSize--small u-color--dustyGray"> mysql, database, connection </p>
                </div>
              </div>
              <div className="u-borderTop--gray">
                <p className="u-fontSize--normal u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--20"> Validate that the postgres version is supported </p>
                <div className="u-marginTop--15 flex flex1 justifyContent--spaceBetween">
                  <Link to={"/explore"} className="u-fontSize--small link"> View spec </Link>
                  <p className="u-fontSize--small u-color--dustyGray"> database, connection </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TroubleshootSpec;
