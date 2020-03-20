import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import ("../../scss/components/shared/CodeSnippet.scss");

class CodeSnippet extends Component {
  state = {
    didCopy: false
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    canCopy: PropTypes.bool,
    copyText: PropTypes.string,
    onCopyText: PropTypes.node,
    preText: PropTypes.node,
    copyDelay: PropTypes.number,
    variant: PropTypes.string,
    downloadAirgapLink: PropTypes.bool,
    downloadAirgapHtml: PropTypes.node,
    isCommand: PropTypes.bool,
  }

  static defaultProps = {
    variant: "plain",
    copyText: "Copy URL",
    copyTextCommand: "Copy command",
    onCopyText: "Copied!",
    copyDelay: 3000
  }

  copySnippet = () => {
    const { children, copyDelay } = this.props;
    const textToCopy = Array.isArray(children)
      ? children.join("\n")
      : children
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.setState({ didCopy: true });

        setTimeout(() => {
          this.setState({ didCopy: false });
        }, copyDelay);
      });
    }
  }

  /**
   * Strips out any newlines, empty strings, and leading/trailing whitespace
   *
   * @param {Array<string>} childStrings - an Array of strings
   * @return {String} a Neatly and well trimmed string
   */
  stripExtraneousSpaces = childStrings => {
    return childStrings
      .map(s => s.trim())
      .filter(Boolean)
      .join("\n");
  }

  render() {
    const {
      className,
      children,
      preText,
      canCopy,
      copyText,
      onCopyText,
      variant,
      downloadAirgapLink,
      downloadAirgapHtml,
      isCommand,
      copyTextCommand
    } = this.props;

    const { didCopy } = this.state;

    return (
      <div className={classNames("CodeSnippet", `variant-${variant}`, className)}>
        <div className="CodeSnippet-content">
          {preText && React.isValidElement(preText)
            ? preText
            : (
              <div className="u-fontSize--small u-fontWeight--bold u-marginBottom--5">{preText}</div>
            )
          }
          <div className="CodeSnippet--prism">
            {Array.isArray(children)
              ? this.stripExtraneousSpaces(children)
              : children.trim()
            }
          </div>
          {canCopy && (
            <span
              className={classNames("CodeSnippet-copy u-fontWeight--bold", {
                "is-copied": didCopy
              })}
              onClick={this.copySnippet}
            >
              {didCopy
                ? onCopyText
                : isCommand ? copyTextCommand : copyText
              } 
            </span>
          )}
          {downloadAirgapLink ?
            <span className="u-color--dustyGray u-fontSize--small u-marginLeft--small u-marginRight--small"> | </span>
          : null}
          {downloadAirgapLink && (
            <span
              className="CodeSnippet-copy u-fontWeight--bold"
            >
            {downloadAirgapHtml} 
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default CodeSnippet;
