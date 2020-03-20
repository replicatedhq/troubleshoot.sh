import React from "react";
import Layout from "../components/Layout";
import Troubleshootsh from "../components/Troubleshootsh";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoints";

@Resizer(BreakpointConfig)
class Kurl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      installerData: null,
      isMobile: false
    };
  }
  
  fetchInstallerData = async () => {
    try {
      const resp = await fetch(process.env.KURL_INSTALLER_URL);  
      const installerData = await resp.json();
      this.setState({
        installerData
      });
    } catch (error) {
      throw error;
    }
  }
  
  componentDidMount() {
    if (!this.props.data) {
      this.fetchInstallerData();
    }
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
    const { installerData } = this.state;

    return (
      <Layout isMobile={isMobile} title={"Troubleshoot.sh"}> 
        <Troubleshootsh isMobile={isMobile} installerData={installerData} />
      </Layout>
    )
  }
};

export default Kurl;