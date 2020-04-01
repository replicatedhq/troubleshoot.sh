import * as React from "react";

import "../../scss/components/shared/Tag.scss";

export default class Tag extends React.Component {
  render() {
    const {
      tag,
    } = this.props;


    return (
      <div className="Tag-wrapper flex-row u-alignSelf--center">
        <div className="Tag-content flex1">
          <span className="Tag-label u-fontWeight--medium">{tag}</span>
        </div>
      </div>
    );
  }
}