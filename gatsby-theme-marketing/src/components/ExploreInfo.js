import * as React from "react";
import ExploreCard from "./ExploreCard";


export default class ExploreInfo extends React.Component {
  render() {
    const { name, specs, isMobile, infoKey } = this.props;

    return (
      <div className="flex flex-column u-marginTop--50" key={infoKey}>
        <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> {name} </p>
        <div className="u-borderTop--gray">
          <div className={`Info--wrapper flex ${isMobile ? "flex-column" : "flexWrap--wrap"} u-marginTop--30`}>
            {specs && specs.map((spec, i) => (
              <ExploreCard name={name} spec={spec} i={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}