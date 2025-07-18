import * as React from "react";
import get from "lodash/get";

import "../../scss/components/shared/Linter.scss";

export default class KotsLinter extends React.Component {
  maybeLineNumber(error) {
    return get(error, "positions.0.start.line")
      ? `Line ${error.positions[0].start.line} | `
      : "";
  }

  maybeLevel(error) {
    return error.type === "error" ? "Error: " : error.type === "warn" ? "Warning: " : "";
  }

  messageFor(error) {
    return `${this.maybeLineNumber(error)}${this.maybeLevel(error)}${error.message}`
  }

  render() {
    const {
      lintExpressions,
      className,
      isMobile,
      toggleLinter
    } = this.props;

    return (
      <div className={`${lintExpressions?.length ? "Linter-wrapper" : "EmptyLinter-wrapper"} flex-column flex1 u-overflow--hidden ${className || ""}`}>
        <div className="Linter--console flex-1-auto flex-column u-overflow--auto">
          <div className="flex flex1 flex-column alignContent--center">
            {lintExpressions?.length ?
              lintExpressions.map((error, i) => (
                <div key={i} className={`ConsoleBlock ${error.type} flex alignSelf--flexStart`}>
                  <span className={`icon u-${error.type}ConsoleIcon flex-auto u-marginRight--small`}></span>
                  <div>
                    {error.path && <span>{error.path}<br /></span>}
                    <span>{this.messageFor(error)}</span>
                  </div>
                  {isMobile && <div className="AbsoluteToggleLinter-wrapper">
                    <span className="icon toggleLinter-icon" onClick={toggleLinter} />
                  </div>}
                </div>
              ))
              :
              <div className="flex1 flex-column alignItems--center justifyContent--center">
                <p className="u-fontSize--normal u-fontWeight--normal u-padding--12">No warnings or errors found in YAML</p>
                {isMobile && <div className="AbsoluteToggleLinter-wrapper">
                  <span className="icon toggleLinter-icon" onClick={toggleLinter} />
                </div>}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
