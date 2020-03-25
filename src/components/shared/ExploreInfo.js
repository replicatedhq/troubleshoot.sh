import * as React from "react";


export default class ExploreInfo extends React.Component {
  render() {
    const { name, infos, isMobile } = this.props;


    return (
      <div className="flex flex-column u-marginTop--50">
        <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> {name} </p>
        <div className="u-borderTop--gray">
          <div className={`Info--wrapper flex ${isMobile ? "flex-column" : "flexWrap--wrap"} u-marginTop--30`}>
            {infos.map((info, i) => {
              return (
                <div className="flex flex-column" key={`${info}-${i}`}>
                  <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                  <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}