import React, { Component } from "react";
import classNames from "classnames";
import { StaticQuery, graphql } from "gatsby";
import SidebarFileTree from "./SidebarFileTree";
import { parseLinksToTree } from "../../utils/parse-links-to-tree";

import "../../scss/components/Sidebar.scss";

export default class Sidebar extends Component {

  DFS = (targetPath, node, prevNodes, depth) => {
    if ((node.path === targetPath) || ((node.path + "/") === targetPath)) {
      return prevNodes;
    }

    if (node.directory) {
      for (let i = 0; i < node.links.length; ++i) {
        const result = this.DFS(targetPath, node.links[i], prevNodes.concat({ depth, directoryName: node.directory }), depth + 1)
        if (result) {
          return result;
        }
      }
    }

    return null
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          {
            allMarkdownRemark(sort: { fields: [frontmatter___weight], order: ASC }) {
              edges {
                node {
                  html
                  frontmatter {
                    path
                    linktitle
                    title
                  }
                }
              }
            }
          }
        `}

        render={({ allMarkdownRemark: { edges: pages } }) => {
          const tree = parseLinksToTree(pages);
          const path = this.DFS(this.props.pathname, tree[0].links[0], [], -1);

          return (
            <div className={classNames({
              "Sidebar": !this.props.isMobile,
              "u-marginTop--20": this.props.isMobile
            })}>
              {tree[0].links[0].links.map((link, i) => {
                return (
                  <SidebarFileTree
                    key={i}
                    data={link}
                    path={[]}
                    whosOpen={path}
                    pathname={this.props.pathname}
                  />
                )
              })}
            </div>
          );
        }}
      />
    );
  }
}
