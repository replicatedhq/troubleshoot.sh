import * as React from "react";
import { Link } from "gatsby";
import Tag from "./shared/Tag";
import CodeSnippet from "./shared/CodeSnippet";
import debounce from "lodash/debounce";

const previewServer = `https://troubleshoot-preview.fly.dev`;

class TroubleshootSpec extends React.Component {
  constructor() {
    super();
    this.state = {
      showCodeSnippet: true,
      copyingSpecYaml: false,

      preflightYAML: "",
      supportBundleYAML: "",

      preflightPreviewId: null,
      supportBundlePreviewId: null,

      lintExpressionMarkers: [],

      copySuccess: "",

      isActive: "preflight"
    }
    this.lintKotsSpec = debounce(this.lintKotsSpec, 200);
  }

  renderAceEditor = (preflightYaml) => {
    import("brace").then((ace) => {
      import("brace/theme/chrome").then(() => {
        import("brace/mode/yaml").then(() => {
          const editor = ace.edit(document.getElementById("ace-editor"));
          editor.setOptions({
            scrollPastEnd: true
          });
          editor.getSession().on("change", () => {
            this.onSpecChange(editor.getSession().doc.$lines.join("\n"))
          });
          editor.getSession().setMode("ace/mode/yaml");
          editor.setTheme("ace/theme/chrome");
          // editor.getSession().addMarker(this.state.lintExpressionMarkers)
          this.setState({ currentSpecCommand: editor.setValue(preflightYaml) });
          window.aceEditor = editor;
        });
      })
    })
  }

  componentDidMount() {
    import("../../static/specs-gen.json").then(module => {
      const currentSpec = module?.specs?.find(spec => spec.slug === this.props.slug);
      this.setState({
        specJson: module,
        preflightYAML: currentSpec.preflightSpecYaml,
        supportBundleYAML: currentSpec.supportSpecYaml
      });
      this.sendToServer("preflight", currentSpec.preflightSpecYaml, true);
      this.sendToServer("support-bundle", currentSpec.supportSpecYaml, true);
      this.renderAceEditor(currentSpec.preflightSpecYaml);
    });
  }

  componentDidUpdate(lastProps, lastState) {
    if (this.state.isActive !== lastState.isActive && this.state.isActive) {
      this.setState({ currentSpecCommand: window.aceEditor.setValue(this.state.isActive === "preflight" ? this.state.preflightYAML : this.state.supportBundleYAML) })
    }
  }

  copySpecYamlToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = this.state.isActive === "preflight" ? this.state.preflightYAML : this.state.supportBundleYAML;
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
    const preflightCommand = `kubectl preflight ${previewServer}/${this.state.preflightPreviewId}`;
    const bundleCommand = `kubectl supportbundle ${previewServer}/${this.state.supportBundlePreviewId}`;
    this.setState({ showCodeSnippet: true });

    if (type === "preflight") {
      this.setState({
        currentCommand: preflightCommand,
        isActive: type
      });
    } else if (type === "support-bundle") {
      this.setState({
        currentCommand: bundleCommand,
        isActive: type
      });
    }
  }

  sendToServer = (specType, spec, onMount) => {
    let uri;
    let method;

    if (specType === "preflight") {
      if (this.state.preflightPreviewId) {
        method = "PUT";
        uri = `${previewServer}/v1/preflight/${this.state.preflightPreviewId}`;
      } else {
        method = "POST";
        uri = `${previewServer}/v1/preflight`;
      }
    } else if (specType === "support-bundle") {
      if (this.state.supportBundlePreviewId) {
        method = "PUT";
        uri = `${previewServer}/v1/support-bundle/${this.state.supportBundlePreviewId}`;
      } else {
        method = "POST";
        uri = `${previewServer}/v1/support-bundle`;
      }
    }

    fetch(uri, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spec })
    })
      .then(async (res) => {
        if (method === "POST") {
          const result = await res.json();
          if (specType === "preflight") {
            this.setState({
              preflightPreviewId: result.id,
            }, () => {
              if (onMount) {
                this.onTryItOut("preflight")
              }
            });
          } else if (specType === "support-bundle") {
            this.setState({
              supportBundlePreviewId: result.id,
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  lintKotsSpec = (specType, spec) => {
    // TODO: implement linting for specs
    const lintingPassed = true;
    if (lintingPassed) {
      this.sendToServer(specType, spec);
    }
  }

  onSpecChange = (value) => {
    const specType = this.state.isActive;
    if (specType === "preflight") {
      this.setState({
        preflightYAML: value,
      });
    } else if (specType === "support-bundle") {
      this.setState({
        supportBundleYAML: value,
      });
    }

    this.lintKotsSpec(specType, value);
  }


  render() {
    const { copySuccess, showCodeSnippet, currentCommand, isActive, specJson } = this.state;
    const { isMobile } = this.props;

    const currentSpec = specJson?.specs?.find(spec => spec.slug === this.props.slug);
    const relatedSpecs = specJson?.specs?.filter(spec => currentSpec?.tags?.find(tag => spec.tags.includes(tag))).filter(spec => spec !== currentSpec)


    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section" style={{marginTop: "50px"}}>
          <div className={`${!isMobile ? "flex1" : "flex-column"} container flex justifyContent--center`}>
            <div className={`${!isMobile && "troubleshootSection troubleshootSectionWidth"}`}>
              <Link to="/explore" className="flex flex1 u-marginBottom--15 u-fontSize--small link">
                <span className="icon backArrow-icon u-marginRight--small" /> Find more specs
                </Link>
              <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium"> {currentSpec?.title} </p>
              <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy"> {currentSpec?.description} </p>

              <div className="u-marginTop--10 u-marginBottom--10 flex">
                <button className={`Button tab flex alignItems--center ${isActive === "preflight" ? "primary darkBlue is-active-blue" : "secondary gray"}`} onClick={() => this.onTryItOut("preflight")}><span className="icon preflight-small"></span>Preflight</button>
                <button className={`Button tab u-marginLeft--10 flex alignItems--center ${isActive === "support-bundle" ? "primary darkBlue is-active-blue" : "secondary gray"}`} onClick={() => this.onTryItOut("support-bundle")}><span className="icon support-small"></span>Support</button>
              </div>

              <div className="MonacoEditor--wrapper flex u-width--full">
                <div className="flex u-width--full u-overflow--hidden" id="ace-editor">
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

              <div className="flex u-marginTop--30 u-marginBottom--30 alignItems--center">
                <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium flex"> Tags </p>
                <div className="flex flex1 u-marginLeft--12">
                  {currentSpec?.tags?.map((tag, i) => (<Tag tag={tag} key={`${tag}-${i}`} />))}
                </div>
              </div>

              <div className="u-borderTop--gray u-marginBottom--30">
                <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30"> Try it out </p>
                {showCodeSnippet &&
                  <div className="flex flex-column u-marginTop--normal">
                    <CodeSnippet
                      canCopy={true}
                      onCopyText={<span className="u-color--vidaLoca">Copied!</span>}
                      learnMore={<Link to={isActive === "support-bundle" ? `/docs/support-bundle/` : `/docs/preflight/`} className="u-color--royalBlue u-lineHeight--normal u-fontSize--small u-textDecoration--underlineOnHover"> {`Learn more about ${isActive === "support-bundle" ? "Support Bundle" : "Preflight"}`}</Link>}
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
