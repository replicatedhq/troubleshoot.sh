import React from "react"
import { Router, Location } from "@reach/router";
import Layout from "../components/Layout";
import TroubleshootSpec from "../components/TroubleshootSpec";
import "../scss/components/ViewSpecs.scss";

class Spec extends React.Component {
  render() {
    return (
    <Layout title={"Troubleshoot Spec"}>
      <FadeTransitionRouter>
        <TroubleshootSpec path="/:slug" />
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