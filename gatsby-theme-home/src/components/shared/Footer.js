import React from "react";
import "../../scss/components/shared/Footer.scss";

export default class Footer extends React.Component {

  getItems() {
    return [
      {
        label: "View on GitHub",
        icon: "github",
        href: "http://github.com/replicatedhq/troubleshoot",
      }
    ];
  }

  render() {
    const footerItems = this.getItems();
    return (
      <div className={`FooterContent-wrapper flex flex-auto justifyContent--center ${this.props.className || ""}`}>
        <div className="Footer-container flex1 flex">
          <div className="TroubleshootFooter flex flex1">
            <div className="flex flex-auto alignItems--center">
              <div className="FooterItem-wrapper flex justifyContent--center alignItems--center">
                <span className="icon u-kurl u-marginRight--normal"></span>
                <span className="FooterItem">Contributed by <a href="https://replicated.com/" target="_blank" rel="noopener noreferrer">Replicated </a></span>
              </div>
            </div>
            <div className="flex flex1 justifyContent--flexEnd alignItems--center alignSelf--center">
              {footerItems.filter(item => item).map((item, i) => {
                let node = (
                  <span className="FooterItem">{item.label}</span>
                );
                if (item.icon) {
                  node = (
                    <div className="flex flex-auto">
                      <span className={`u-marginRight--small ${item.icon}`} />
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="FooterItem u-marginTop--4">{item.label}</a>
                    </div>
                  );
                } else {
                  node = (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="FooterItem">{item.label}</a>
                  )
                }

                return (
                  <div key={i} className="FooterItem-wrapper">
                    {node}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
