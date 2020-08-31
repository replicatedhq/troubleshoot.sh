import * as React from "react";
import { Link } from "gatsby";


export default class ExploreCard extends React.Component {
  render() {
    const { name, i, spec, isMobile } = this.props;

    return (
      <div className={`${isMobile ? "InfoMobile--item" : "Info--item"} flex flex-column`} key={`${spec.id}-${i}`}>
        <div className="flex alignItems--center u-marginBottom--15">
          <span className={`category-icon`} style={{ backgroundImage: `url("${spec.iconUri}")` }}> </span>
          <div className="flex flex-column u-marginLeft--10">
            <span className="u-fontSize--small u-fontWeight--medium u-color--waikawaGray"> {name} </span>
            <div className="flex flex1 u-marginTop--small">
              <span className="icon tagLight-icon" />
              {spec.tags.map((tag, i) => (
                <div className="Tags-wrapper tag-card u-fontSize--small u-color--silver">
                  <span className="u-color--silver u-marginLeft--small" key={`${tag}-${i}`}>
                    {tag}
                  </span>
                  <span className="comma"></span>
                </div>))}
            </div>
          </div>
        </div>
        <div className="flex flex-column" style={{minHeight: "120px"}}>
          <p className="Info--wrapper--info u-fontSize--large u-color--biscay u-fontWeight--medium info-title" style={{lineHeight: "24px"}}>{spec.title}</p>
          <span className="u-fontSize--small u-color--waikawaGray body-copy u-marginTop--8 info-desc" style={{lineHeight: "22px"}}>{spec.description}</span>
        </div>

        <div className="flex flex-auto u-marginTop--8" style={{ flexGrow: 1 }}>
          <Link to={`/preflight/${spec.slug}`} className="Link-wrapper u-fontSize--small u-fontWeight--medium flex justifyContent--center alignItems--center u-marginRight--10">
            <span className="icon preflightSmall-icon u-marginRight--small" /> Preflight Check
          </Link>
          <Link to={`/support-bundle/${spec.slug}`} className="Link-wrapper u-fontSize--small u-fontWeight--medium flex justifyContent--center alignItems--center">
            <span className="icon supportSmall-icon u-marginRight--small" /> Support Bundle
          </Link>
        </div>
      </div>
    );
  }
}