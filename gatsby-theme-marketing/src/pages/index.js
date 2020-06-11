import React from "react";
import Layout from "../components/Layout";
import Troubleshootsh from "../components/Troubleshootsh";

class Troubleshoot extends React.Component {  
  render() {
    return (
      <Layout title={"Troubleshoot.sh"}> 
        <Troubleshootsh />
      </Layout>
    )
  }
};

export default Troubleshoot;