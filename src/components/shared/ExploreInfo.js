import * as React from "react";


export default class ExploreInfo extends React.Component {
  render() {
    const { name, specs, isMobile } = this.props;


    return (
      <div className="flex flex-column u-marginTop--50">
        <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> {name} </p>
        <div className="u-borderTop--gray">
          <div className={`Info--wrapper flex ${isMobile ? "flex-column" : "flexWrap--wrap"} u-marginTop--30`}>
            {specs && specs.map((spec, i) => {
              return (
                <div className="flex alignItems--center" key={`${spec.id}-${i}`}>
                  <span className="category-icon" style={{ backgroundImage: `url(${spec.iconUri})` }} />
                  <div className="flex-column u-marginLeft--12">
                    <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {spec.title} </p>
                    <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {spec.description} </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}