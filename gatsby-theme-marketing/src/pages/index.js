import React from "react";
import Layout from "../components/Layout";
import Troubleshootsh from "../components/Troubleshootsh";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoint";

@Resizer(BreakpointConfig)
class Troubleshoot extends React.Component { 
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
    return (
      <Layout title="Troubleshoot.sh" isMobile={this.state.isMobile}> 
        <Troubleshootsh isMobile={this.state.isMobile}/>
      </Layout>
    )
  }
};

export default Troubleshoot;