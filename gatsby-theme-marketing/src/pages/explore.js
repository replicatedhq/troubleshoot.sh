import React from "react";
import Layout from "../components/Layout";
import CustomQueryStringComponent from "../components/CustomQueryStringComponent";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoint";

@Resizer(BreakpointConfig)
class ExploreSpec extends React.Component { 
  render() {
    const isMobile = this.props.breakpoint === "mobile";

    return (
      <Layout title="Explore categories" isMobile={isMobile}> 
        <CustomQueryStringComponent isMobile={isMobile} />
      </Layout>
    )
  }
};

export default ExploreSpec;