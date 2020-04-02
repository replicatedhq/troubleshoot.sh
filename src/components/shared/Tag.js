import * as React from "react";
import { Link } from "gatsby";

import "../../scss/components/shared/Tag.scss";

export default class Tag extends React.Component {
  render() {
    const {
      tag,
    } = this.props;


    return (
      <Link to={`/explore/tag?current=${tag}`} className="Tag-wrapper flex-row u-alignSelf--center">
        <div className="Tag-content flex1">
          <span className="Tag-label u-fontWeight--medium">{tag}</span>
        </div>
      </Link>
    );
  }
}