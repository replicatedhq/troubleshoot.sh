import React from "react"
import { Router, Location } from "@reach/router";
import Layout from "../components/Layout";
import TroubleshootSpec from "../components/TroubleshootSpec";

class Spec extends React.Component {
  render() {
    return (
    <Layout title={"Try troubleshoot specs"}>
      <FadeTransitionRouter>
        <TroubleshootSpec path="spec/:slug" />
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