import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import "../../scss/components/shared/SidebarFileTree.scss";

function titleize(string) {
  return string
    .split("-")
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}
function untitleize(string) {
  return string
    .split(" ")
    .map(s => s[0].toLowerCase() + s.slice(1))
    .join("-");
}

export default class SidebarFileTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      treeState: []
    };
  }

  onDirectoryClick = event => {
    event.stopPropagation();
    const { treeState } = this.state;
    const isDirectory = event.currentTarget.dataset.type === "directory";
    const path = event.currentTarget.dataset.path;

    if (this.props.onDirectoryClick && isDirectory) {
      const mockEvent = {
        stopPropagation: () => { },
        currentTarget: {
          dataset: {
            type: "directory",
            path
          }
        }
      }
      this.props.onDirectoryClick(mockEvent);
    } else {
      const linkingToFirstSubItem = this.DFS(treeState, null, untitleize(path));
      if (linkingToFirstSubItem) {
        navigate(linkingToFirstSubItem.path);
      }
      const dirpath = untitleize(path);
      const mapLinks = entry => {
        const copy = {
          ...entry,
          open: entry.directory
            ? entry.directory.includes(dirpath)
            : entry.path.includes(dirpath),
        };

        if (entry.directory) {
          copy.links = entry.links.map(mapLinks);
        }
        return copy;
      };
      this.setState({
        treeState: treeState.map(mapLinks)
      });
    }
  }

  onLinkClick = event => {
    event.stopPropagation();
    navigate(event.currentTarget.dataset.path);
  }

  componentDidMount() {
    // Only runs for the root
    if (!this.props.depth) {
      const { data } = this.props;
      let dataToRender = data;

      // Extract out the children to control them
      dataToRender = data[0]
        .links[0] // /
        .links; // docs

      const mapData = item => {
        if (!item.directory) {
          return item;
        }

        return {
          ...item,
          open: item.directory.includes(this.props.pathname.split("/")[2]),
          links: item.links.map(mapData)
        };
      };
      // Inject state properties to children:
      const stateData = dataToRender.map(mapData);
      this.setState({
        treeState: stateData
      });
    }
  }

  DFS = (links, dirPath, targetPath) => {
    if (targetPath === dirPath) {
      return links[0]
    } else {
      for (let i = 0; i < links.length; ++i) {
        let subPath = links[i];
        if (subPath.directory) {
          let subPathObject = this.DFS(subPath.links, subPath.directory, targetPath);
          if (subPathObject) {
            return subPathObject;
          }
        }
      }
    }
  }

  render() {
    const { depth = 0, data, type, open, children } = this.props;
    const { treeState } = this.state;

    if (treeState.length === 0 && depth === 0) {
      // If root and there's no tree state, don't render anything
      return null;
    }

    const dataToRender = depth === 0
      ? treeState
      : data;

    return (
      <div
        className={`SidebarFileTree depth-${depth} flex1 flex-column ${type === "directory" ? "is-directory" : "is-file"}`}
        onClick={type === "directory" ? this.onDirectoryClick : null}
        data-type={type}
        data-path={children && children.toString()}
      >
        {children}
        {(open || depth === 0) && dataToRender && dataToRender.map((entry, idx) => {
          if (entry.directory) {
            return (
              <SidebarFileTree
                key={`${depth}-${idx}`}
                depth={depth + 1}
                type="directory"
                open={entry.open}
                onDirectoryClick={this.onDirectoryClick}
                data={entry.links}
              >
                {titleize(entry.directory)}
              </SidebarFileTree>
            );
          } else {
            return (
              <SidebarFileTree
                key={`${depth}-${idx}`}
                depth={depth + 1}
                open={entry.open}
                type="file"
              >
                <Link
                  to={entry.path}
                  activeClassName="active"
                  onClick={this.onLinkClick}
                  data-path={entry.path}
                >
                  {entry.linktitle || entry.title}
                </Link>
              </SidebarFileTree>
            );
          }
        })}
      </div>
    );
  }
}