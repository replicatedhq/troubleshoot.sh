import React from "react"
import { Router, Location } from "@reach/router";
import Layout from "../components/Layout";
import TroubleshootSpec from "../components/TroubleshootSpec";

import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoints";

@Resizer(BreakpointConfig)
class Spec extends React.Component {
  state = {
    isMobile: false
  }

  componentDidMount() {
    if (this.props.breakpoint) {
      this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
  }

  componentDidUpdate(lastProps) {
    if (this.props.breakpoint !== lastProps.breakpoint && this.props.breakpoint) {
        this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
  }


  render() {
    const { isMobile } = this.state;
    return (
    <Layout isMobile={isMobile} title={"Troubleshoot Spec"}>
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