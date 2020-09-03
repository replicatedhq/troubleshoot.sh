import * as React from "react";
import { Link } from "gatsby";
import CodeSnippet from "./shared/CodeSnippet";
import debounce from "lodash/debounce";
import find from "lodash/find";
import get from "lodash/get";
import KotsLinter from "./shared/KotsLinter";
import ExploreCard from "./ExploreCard";
import { titleize } from "../utils/utilities";

import "../scss/components/TroubleshootSpec.scss";

const previewServer = `https://troubleshoot.run`;

class TroubleshootPreflight extends React.Component {
  constructor() {
    super();
    this.state = {
      showCodeSnippet: true,
      copyingSpecYaml: false,

      preflightYAML: "",

      preflightPreviewId: null,

      lintExpressions: [],
      lintExpressionMarkers: [],

      copySuccess: "",

      fetchingError: false,
      displayMobileLinter: false
    }
    this.lintTroubleshootSpec = debounce(this.lintTroubleshootSpec, 200);
  }

  renderAceEditor = (preflightYaml) => {
    import("brace").then((ace) => {
      import("brace/theme/chrome").then(() => {
        import("brace/mode/yaml").then(() => {
          const editor = ace.edit(document.getElementById("ace-editor"));
          editor.setOptions({
            scrollPastEnd: true,
            fontSize: 16
          });
          editor.getSession().on("change", () => {
            this.onSpecChange(editor.getSession().doc.$lines.join("\n"))
          });
          editor.getSession().setMode("ace/mode/yaml");
          editor.setTheme("ace/theme/chrome");
          this.setState({ currentSpecCommand: editor.setValue(preflightYaml) });
          window.aceEditor = editor;
        });
      })
    })
  }

  removeLintExpressionMarkers = () => {
    this.state.lintExpressionMarkers.forEach(marker => {
      window.aceEditor.session.removeMarker(marker.id);
    });
  }

  generateLintExpressionMarkers = lintExpressions => {
    import("brace").then((ace) => {
      const markers = [];
      const Range = ace.acequire('ace/range').Range;
      for (let i = 0; i < lintExpressions.length; i++) {
        const expression = lintExpressions[i];
        if (expression.positions) {
          for (let position of expression.positions) {
            let line = get(position, "start.line");
            if (line) {
              const marker = new Range(line - 1, 0, line, 0);
              marker.type = expression.type;
              marker.id = window.aceEditor.session.addMarker(marker, `${marker.type}-highlight`, "text");
              markers.push(marker);
            }
          }
        }
      }
      this.setState({ lintExpressionMarkers: markers });
    });
  }

  componentDidMount() {
    import("../../static/specs-gen.json").then(module => {
      const currentSpec = module?.specs?.find(spec => spec.slug === this.props.slug);
      this.setState({
        specJson: module,
        preflightYAML: currentSpec?.preflightSpecYaml ? currentSpec?.preflightSpecYaml : ""
      });
      this.sendToServer(currentSpec.preflightSpecYaml);
      this.renderAceEditor(currentSpec.preflightSpecYaml);
    });
  }

  copySpecYamlToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = this.state.preflightYAML;
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

  onTryItOut = () => {
    const preflightCommand = `kubectl preflight ${previewServer}/${this.state.preflightPreviewId}`;
    this.setState({ showCodeSnippet: true, currentCommand: preflightCommand });
  }

  sendToServer = (spec) => {
    let uri;
    let method;

    this.setState({ fetchingError: false });
    if (this.state.preflightPreviewId) {
      method = "PUT";
      uri = `${previewServer}/v1/preflight/${this.state.preflightPreviewId}`;
    } else {
      method = "POST";
      uri = `${previewServer}/v1/preflight`;
    }


    fetch(uri, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spec: btoa(spec) })
    })
      .then(async (res) => {
        if (method === "POST") {
          const result = await res.json();
          if (!result) {
            this.setState({ fetchingError: true });
          } else {
            this.setState({ preflightPreviewId: result.id }, () => {
              this.onTryItOut();
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ fetchingError: true });
      })
  }

  lintTroubleshootSpec = (spec) => {
    fetch("https://lint.replicated.com/v1/troubleshoot-lint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spec: `${spec}`,
      }),
    })
      .then(async (res) => {
        const response = await res.json();

        // clear current markers
        this.removeLintExpressionMarkers();

        // update lint expressions
        const lintExpressions = response.lintExpressions;
        this.setState({ lintExpressions });

        // add new markers
        this.generateLintExpressionMarkers(lintExpressions);

        const haveErrors = find(lintExpressions, { type: "error" });
        if (!haveErrors) {
          this.sendToServer(spec);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSpecChange = (value) => {
    this.setState({ preflightYAML: value });

    this.lintTroubleshootSpec(value);
  }

  toggleLinter = () => {
    this.setState({ displayMobileLinter: !this.state.displayMobileLinter });
  }

  download = (filename, yaml) => {
    var element = document.createElement('a');
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(yaml));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  downloadYaml = () => {
    const filename = "preflight.yaml";

    this.download(filename, this.state.preflightYAML);
  }


  render() {
    const { copySuccess, showCodeSnippet, currentCommand, specJson, lintExpressions, fetchingError } = this.state;
    const { isMobile } = this.props;

    const currentSpec = specJson?.specs?.find(spec => spec.slug === this.props.slug);
    const tags = currentSpec?.tags ? currentSpec.tags : [];
    const relatedSpecs = specJson?.specs?.filter(spec => tags.find(tag => spec.tags.includes(tag))).filter(spec => spec !== currentSpec);

    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section" style={{ marginTop: "30px" }}>
          <div className="flex-column container flex justifyContent--center">
            <div className="troubleshootSection">
              <Link to="/explore" className="flex flex1 u-marginBottom--15 u-fontSize--small link">
                <span className="icon backArrow-icon u-marginRight--small" /> Find more examples
                </Link>
              <div className="flex flex1 justifyContent--spaceBetween">
                <div className="flex flex-column spec-title-wrapper">
                  <p className="u-fontSize--largest u-color--biscay u-lineHeight--more u-fontWeight--medium"> {currentSpec?.title} </p>
                  <span className="u-fontSize--large u-color--biscay u-lineHeight--normal u-marginBottom--10 u-marginTop--small body-copy"> {currentSpec?.description} </span>
                  <div className="flex flex1">
                    <span className="icon tag-icon" />
                    {tags.map((tag, i) => (
                      <div className="Tags-wrapper u-fontSize--small u-color--dustyGray" key={`${tag}-${i}`}>
                        <Link to={`/explore?tag=${tag}`} className="u-color--dustyGray u-textDecoration--underline u-marginLeft--small">
                          {tag}
                        </Link>
                        <span className="comma"></span>
                      </div>))}
                  </div>
                </div>
                {!isMobile &&
                  <div className="flex flex-column">
                    <p className="u-fontSize--large u-color--biscay u-lineHeight--more u-fontWeight--medium u-marginBottom--10"> Contributors </p>
                    {currentSpec?.contributors?.map((contributor, i) => (
                      <div className="Contributors--wrapper" key={`${contributor.name}-${i}`}>
                        <span className="contributer-icon" style={{ backgroundImage: `url(${contributor.avatarUri})` }} />
                      </div>
                    ))}
                  </div>}
              </div>

              {!isMobile &&
                <div className="EditorHeader-wrapper flex flex1 alignItems--center u-marginTop--30">
                  <span className="icon preflight-small u-marginRight--small" /> <span className="u-fontSize--normal u-fontWeight--bold u-color--biscay"> Preflight Check </span>
                  <div className="flex flex1 justifyContent--flexEnd alignItems--center">
                    {!copySuccess ?
                      <button className="Button copy blue" onClick={this.copySpecYamlToClipboard}>Copy YAML</button>
                      : <span className="u-color--vidaLoca u-fontSize--small">{copySuccess}</span>}
                    <span className="u-color--dustyGray u-fontSize--small u-marginLeft--small u-marginRight--small"> | </span>
                    <button className="Button copy blue" onClick={this.downloadYaml}>Download YAML</button>
                  </div>
                </div>}

              <div className={`MonacoEditor--wrapper flex ${isMobile && "u-marginTop--30"}`}>
                <div className="flex u-width--full u-overflow--hidden" id="ace-editor"></div>
                {!isMobile ?
                  <div className="AbsoluteTest-wrapper flex-column u-width--fourth u-marginRight--10">
                    <div className="Test-wrapper flex-column flex1 u-overflow--hidden">
                      <span className="u-fontSize--large u-fontWeight--medium u-color--biscay"> Test using a temporary URL </span>
                      <span className="u-color--dustyGray u-fontSize--normal body-copy u-lineHeight--more u-marginTop--15"> First you will need to <a href="/docs" target="_blank" rel="noopener noreferrer" className="u-color--royalBlue u-fontWeight--medium  u-textDecoration--underlineOnHover"> install the preflight plugin. </a> Once you have the plugin, run the following command to get results against your cluster. </span>
                      {fetchingError ?
                        <div className="ErrorBlock u-marginTop--10"> There was a problem fetching the command. Please <span className="u-color--royalBlue u-fontWeight--medium  u-textDecoration--underlineOnHover" onClick={() => this.sendToServer(this.state.preflightYAML)}> try again  </span> </div>
                        :
                        showCodeSnippet &&
                        <div className="flex flex-column u-marginTop--normal u-marginTop--10">
                          <CodeSnippet
                            canCopy={true}
                            onCopyText={<span className="u-color--vidaLoca">Copied!</span>}
                            learnMore={<a href="/docs/preflight/introduction/" target="_blank" rel="noopener noreferrer" className="u-color--royalBlue u-lineHeight--normal u-fontSize--small u-textDecoration--underlineOnHover">
                              Learn more</a>}
                          >
                            {currentCommand ? currentCommand : ""}
                          </CodeSnippet>
                        </div>
                      }
                    </div>
                  </div>
                  :
                  <div className="AbsoluteToggleLinter-wrapper">
                    <span className="icon toggleLinter-icon" onClick={this.toggleLinter} />
                  </div>
                }
                {this.state.displayMobileLinter &&
                  <div className="MobileLintExpressions-wrapper flex-column u-width--full">
                    <KotsLinter lintExpressions={this.state.lintExpressions} className={this.state.lintExpressions.length === 0 ? "u-padding--10" : ""} isMobile={isMobile} toggleLinter={this.toggleLinter} />
                  </div>}
              </div>
              {isMobile && <div className="flex alignItems--center u-marginTop--10">
                {!copySuccess ?
                  <span className="link u-fontSize--small" onClick={this.copySpecYamlToClipboard}>Copy YAML</span>
                  : <span className="u-color--vidaLoca u-fontSize--small">{copySuccess}</span>}
                <span className="u-color--dustyGray u-fontSize--small u-marginLeft--small u-marginRight--small"> | </span>
                <button className="Button copy blue" onClick={this.downloadYaml}>Download YAML</button>
              </div>}
              {!isMobile &&
                <div className="LintExpressions-wrapper flex-column">
                  <KotsLinter lintExpressions={lintExpressions} />
                </div>
              }
            </div>

            {isMobile &&
              <div className="flex-column flex1 u-marginTop--40">
                <span className="u-fontSize--large u-fontWeight--medium u-color--biscay"> Test using a temporary URL </span>
                <span className="u-color--dustyGray u-fontSize--normal body-copy u-lineHeight--more u-marginTop--15"> First you will need to <a href="/docs" target="_blank" rel="noopener noreferrer" className="u-color--royalBlue u-fontWeight--medium  u-textDecoration--underlineOnHover"> install the preflight plugin. </a> Once you have the plugin, run the following command to get results against your cluster. </span>
                {fetchingError ?
                  <div className="ErrorBlock u-marginTop--10"> There was a problem fetching the command. Please <span className="u-color--royalBlue u-fontWeight--medium  u-textDecoration--underlineOnHover" onClick={() => this.sendToServer(this.state.preflightYAML)}> try again  </span> </div>
                  :
                  showCodeSnippet &&
                  <div className="flex flex-column u-marginTop--normal u-marginTop--10">
                    <CodeSnippet
                      canCopy={true}
                      onCopyText={<span className="u-color--vidaLoca">Copied!</span>}
                      learnMore={<a href="/docs/preflight/introduction/" target="_blank" rel="noopener noreferrer" className="u-color--royalBlue u-lineHeight--normal u-fontSize--small u-textDecoration--underlineOnHover">
                        Learn more</a>}
                    >
                      {currentCommand ? currentCommand : ""}
                    </CodeSnippet>
                  </div>
                }
              </div>}

            <div className="flex flex-column u-marginBottom--15">
              <p className="u-fontSize--18 u-color--biscay u-lineHeight--more u-fontWeight--bold u-marginTop--30 u-marginBottom--10"> Related examples </p>
              <div className="u-borderTop--gray"></div>
              <div className={`flex ${isMobile ? "flex-column" : "flex1"} u-marginTop--15`}>
                {relatedSpecs?.slice(0, 2).map((spec, i) => (
                  <div className={`Info--wrapper flex ${isMobile ? "flex-column" : "flexWrap--wrap"}`} key={`${spec.slug}-${i}`} >
                    <ExploreCard spec={spec} i={i} isMobile={isMobile} name={titleize(spec.category.replace(/_/gi, " "))} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TroubleshootPreflight;