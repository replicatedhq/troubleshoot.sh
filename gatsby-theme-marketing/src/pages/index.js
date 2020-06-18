import React from "react";
import Layout from "../components/Layout";
import Troubleshootsh from "../components/Troubleshootsh";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoint";

@Resizer(BreakpointConfig)
class Troubleshoot extends React.Component {  
  render() {
    const isMobile = this.props.breakpoint === "mobile";
    
    return (
      <Layout title="Troubleshoot.sh" isMobile={isMobile}> 
        <Troubleshootsh isMobile={isMobile}/>
      </Layout>
    )
  }
};

export default Troubleshoot;