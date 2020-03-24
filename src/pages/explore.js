import React from "react";
import Layout from "../components/Layout";
import ExploreSpecComponent from "../components/ExploreSpec";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoints";

@Resizer(BreakpointConfig)
class ExploreSpec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
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
      <Layout isMobile={isMobile} title={"Explore spec"}> 
        <ExploreSpecComponent isMobile={isMobile} />
      </Layout>
    )
  }
};

export default ExploreSpec;