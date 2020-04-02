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


class TroubleshootSpec extends React.Component {
  state = {
    showCodeSnippet: true,
    copyingSpecYaml: false,
    copySuccess: "",
    isActive: "preflight"
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
    import("../../static/specs.json").then(module => {
      this.setState({ specJson: module });
    });
    this.renderMonacoEditor();
  }

  componentDidUpdate(lastProps, lastState) {
    if (this.state.specJson !== lastState.specJson && this.state.specJson) {
      const currentSpec = this.state.specJson?.specs?.find(spec => spec.slug === this.props.slug);
      if (currentSpec) {
        this.setState({
          currentCommand: `kubectl preflight https://preflight.com/${currentSpec?.id}`
        })
      }
    }
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
    const currentSpec = this.state.specJson?.specs?.find(spec => spec.slug === this.props.slug);
    const preflightCommand = `kubectl preflight https://preflight.com/${currentSpec?.id}`;
    const bundleCommand = `kubectl supportbundle https://supportbundle.com/${currentSpec?.id}`;
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
    const { copySuccess, showCodeSnippet, currentCommand, isActive, specJson } = this.state;
    const { isMobile } = this.props;

    const currentSpec = specJson?.specs?.find(spec => spec.slug === this.props.slug);
    const relatedSpecs = specJson?.specs?.filter(spec => currentSpec?.tags?.find(tag => spec.tags.includes(tag))).filter(spec => spec !== currentSpec);


    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section landing-header">
          <div className={`${!isMobile ? "flex1" : "flex-column"} container flex justifyContent--center`}>
            <div className={`${!isMobile && "troubleshootSection troubleshootSectionWidth"}`}>
              <Link to="/explore" className="flex flex1 u-marginBottom--15 u-fontSize--small link">
                <span className="icon backArrow-icon u-marginRight--small" /> Find more specs
                </Link>
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium"> {currentSpec?.title} </p>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy"> {currentSpec?.description} </p>
              <div className="MonacoEditor--wrapper flex u-width--full">
                <div className="flex u-width--full u-overflow--hidden" id="monaco">
                </div>
              </div>
              <div className="u-marginTop--30">
                {!copySuccess ?
                  <button className="Button primary blue u-marginRight--30" onClick={this.copySpecYamlToClipboard}>Copy spec YAML</button>
                  : <span className="u-color--vidaLoca u-marginRight--30">{copySuccess}</span>}
              </div>
            </div>
            <div className={`${!isMobile ? "troubleshootSection u-marginLeft--50 troubleshootSectionWidth" : "u-marginTop--30"}`}>
              <div className="flex alignItems--center">
              <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium"> Contributors </p>
              {currentSpec?.contributors?.map((contributor, i) => (
                <div className="Contributors--wrapper" key={`${contributor.name}-${i}`}> 
                  <span className="contributer-icon" style={{ backgroundImage: `url(${contributor.avatarUri})` }} />
                </div>
              ))}
              </div>
              
              <div className="flex u-marginTop--30 u-marginBottom--30">
                <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium flex"> Tags </p>
                <div className="flex flex1 u-marginLeft--12">
                  {currentSpec?.tags?.map((tag, i) => (<Tag tag={tag} key={`${tag}-${i}`} />))}
                </div>
              </div>

              <div className="u-borderTop--gray u-marginBottom--30">
                <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30"> Try it out </p>
                <p className="u-fontSize--large u-color--dustyGray u-marginTop--small body-copy"> Find select the type of command you want to try</p>
                <div className="u-marginTop--30 flex">
                  <button className={`Button tab flex alignItems--center ${isActive === "preflight" ? "primary darkBlue is-active-blue" : "secondary gray"}`} onClick={() => this.onTryItOut("preflight")}><span className="icon preflight-small"></span>Preflight</button>
                  <button className={`Button tab u-marginLeft--10 flex alignItems--center ${isActive === "supportbundle" ? "primary darkBlue is-active-blue" : "secondary gray"}`} onClick={() => this.onTryItOut("supportbundle")}><span className="icon support-small"></span>Support</button>
                </div>
                {showCodeSnippet &&
                  <div className="flex flex-column u-marginTop--normal">
                    <CodeSnippet
                      canCopy={true}
                      onCopyText={<span className="u-color--vidaLoca">Copied!</span>}
                      learnMore={<Link to={isActive === "supportbundle" ? `/docs/support-bundle/` : `/docs/preflight/`} className="u-color--royalBlue u-lineHeight--normal u-fontSize--small u-textDecoration--underlineOnHover"> {`Learn more about ${isActive === "supportbundle" ? "Support Bundle" : "Preflight"}`}</Link>}
                    >
                      {currentCommand ? currentCommand : ""}
                    </CodeSnippet>
                  </div>
                }
              </div>

              <div className="u-borderTop--gray u-marginBottom--15">
                <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30"> Related specs </p>
                {relatedSpecs?.slice(0, 2).map((spec, i) => (
                  <div className="RelatedSpecs--wrapper" key={`${spec.id}-${i}`}>
                    <p className="u-fontSize--normal u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--10"> {spec.description} </p>
                    <div className="u-marginTop--15 flex flex1">
                      <Link to={`/spec/${spec.slug}`} className="u-fontSize--small link"> View spec </Link>
                      <div className="flex flex1 justifyContent--flexEnd">
                        <span className="icon tag-icon" />
                        {spec.tags.map((tag, i) => (
                          <p className="u-fontSize--small u-color--dustyGray u-marginLeft--10" key={`${tag}-${i}`}> {tag} </p>
                        )
                        )}
                      </div>
                    </div>
                  </div>
                )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TroubleshootSpec;
