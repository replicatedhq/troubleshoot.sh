import React from "react"
import { Router, Location } from "@reach/router";
import Layout from "../components/Layout";
import TroubleshootSpec from "../components/TroubleshootSpec";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoint";

@Resizer(BreakpointConfig)
class Spec extends React.Component {
  render() {
    const isMobile = this.props.breakpoint === "mobile";

    return (
    <Layout title="Try troubleshoot specs" isMobile={isMobile}>
      <FadeTransitionRouter>
        <TroubleshootSpec path="spec/:slug" isMobile={isMobile} />
      </FadeTransitionRouter>
    </Layout>
    )
  }
}

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <Router location={location} className="flex flex1">
        {props.children}
      </Router>
    )}
  </Location>
)

export default Spec;