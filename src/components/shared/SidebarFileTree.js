import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import isEqual from "lodash/isEqual"

import "../../scss/components/shared/SidebarFileTree.scss";

function titleize(string) {
  return string
    .split("-")
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}

export default class SidebarFileTree extends Component {
  onLinkClick = event => {
    event.stopPropagation();
    navigate(event.currentTarget.dataset.path);
  }

  render() {
    const { depth = 0, data, whosOpen, path, onDirectoryClick, pathname } = this.props;
    const isOpen = () => whosOpen && !!whosOpen.find(el => isEqual(el, {depth, directoryName: data.directory}))


    return (
      (data.directory) ?
        <div
          className={`SidebarFileTree depth-${depth} flex1 flex-column is-directory ${depth === 1 && "sub-dir"}`}
          onClick={e => {
            e.stopPropagation()
            if (pathname !== data.links[0].path) {
              navigate(data.links[0].path);
            }
        }}
        >
          {titleize(data.directory)}

          {isOpen() && (data.links.map((link, idx) =>
            (<SidebarFileTree
              key={`${depth}-${idx}`}
              depth={depth + 1}
              type="directory"
              data={link}
              path={path.concat({depth, directoryName: data.directory})}
              whosOpen={whosOpen}
              onDirectoryClick={onDirectoryClick}
            >
            </SidebarFileTree>))
          )}
        </div>

        :

        <div className={`SidebarFileTree depth-${depth} flex1 flex-column is-file ${depth === 2 && "sub-file"}`}>
          <Link
            to={data.path}
            activeClassName="active"
            onClick={this.onLinkClick}
            data-path={data.path}
          >
            {data.linktitle || data.title}
          </Link>
        </div>
    )
  }
}