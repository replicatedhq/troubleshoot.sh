import * as React from "react";
import "../scss/components/ExploreSpec.scss";

const clusterInfo = [
  { name: "Kubernetes", description: "Validate that at least n nodes in the cluster have GPU support" },
  { name: "Kubernetes", description: "Kubernetes version" },
  { name: "Kubernetes", description: "Number of nodes" },
  { name: "Kubernetes", description: "Distribution / Managed K8s" },
  { name: "Kubernetes", description: "Supported container runtime" },
  { name: "Kubernetes", description: "Validate that sufficient CPU and memory are available for scheduling" },
  { name: "Kubernetes", description: "All nodes are ready / node status" }
];

const databaseInfo = [
  { name: "Postgres connection string", description: "Validate that the connection string is valid" },
  { name: "Postgres connection string", description: "Validate that the postgres version is supported" },
  { name: "MySQL connection string", description: "Validate that the connection string is valid" },
  { name: "MySQL connection string", description: "Validate that the MySQL version is supported" }
];

const storageInfo = [
  { name: "Storage", description: "Validate that a storage class exists" },
  { name: "Rook", description: "Validate that Rook / Ceph have a quorum" },
  { name: "OpenEBS", description: "Validate OpenEBS" },
  { name: "Disk", description: "Validate that disk capacity exceeds n (limit ranges allow for PVC creation)" },
  { name: "Rook", description: "How to debug Rook" }
];

const networkingInfo = [
  { name: "Kubernetes", description: "Validate there is an ingress controller" },
  { name: "Kubernetes", description: "Can support a Load Balancer" },
  { name: "Kubernetes", description: "NodePort is available" },
  { name: "Kubernetes", description: "Verify that a TLS secret exists, is valid" }
];

const cloudProviderInfo = [
  { name: "Amazon S3", description: "Verify that an S3 bucket exists and is readable/writeable" },
  { name: "Amazon S3", description: "Verify that the IAM instance role has n permissions" },
  { name: "Cloud provider", description: "Verify that the cluster is running in a specific cloud provider (managed or not)" }
]

const performanceInfo = [
  { name: "Kubernetes", description: "Validate that pod to pod networking bandwidth " },
];

const externalAppInfo = [
  { name: "GitHub", description: "Verify that a GitHub app / key / secret are valid" },
  { name: "GitLab", description: "Verify that a GitLab app / key / secret are valid" },
  { name: "Salesforce", description: "Validate a Salesforce Key is valid" },
]

class ExploreSpec extends React.Component {
  render() {
    const categories = ["Database", "Cloud provider", "External app dependecies", "Cluster information", "Storage", "Performance", "Networking"];
    const tags = ["database", "connection", "storage", "networking", "kubernetes", "performance", "cloud", "s3", "postgres", "mysql", "cluster", "pods"];

    return (
      <div className="u-width--full u-overflow--auto flex-column flex1">
        <div className="section landing-header gradient border justifyContent--center alignItems--center">
          <div className="container">
            <p className="u-fontSize--jumbo u-fontWeight--bold u-color--biscay u-lineHeight--more"> Explore troubleshoot specs </p>
            <p className="u-fontSize--large u-color--dustyGray u-lineHeight--normal u-marginBottom--20 u-marginTop--small body-copy">
              Find collector and analyzer specs. You can search for a tag like “database” or something even more specific like “mysql”. </p>
          </div>
        </div>

        <div className="section u-marginTop--30">
          <div className="flex flex1 container">
            <div className="flex">
              <div className="flex-column">
                <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay"> Categories </p>
                {categories.map((category, i) => {
                  return (
                    <p className="u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 body-copy" key={`${category}-${i}`}> {category} </p>
                  )
                })}

                <p className="u-fontSize--18 u-fontWeight--bold u-color--biscay u-marginTop--50"> Tags </p>
                {tags.map((tag, i) => {
                  return (
                    <p className="u-fontSize--normal u-color--dustyGray u-fontWeight--bold u-lineHeight--normal u-paddingTop--30 body-copy" key={`${tag}-${i}`}> {tag} </p>
                  )
                })}
              </div>
            </div>
            <div className="flex1 flex-column u-marginLeft--50">
              <div className="flex flex-column">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Cluster information </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {clusterInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>

                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Database </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {databaseInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--tundora u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Storage </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {storageInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Networking </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {networkingInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Performance </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {performanceInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> Cloud provider </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {cloudProviderInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <div className="flex flex-column u-marginTop--50">
                <p className="u-fontSize--largest u-fontWeight--bold u-color--biscay u-marginBottom--10"> External app dependecies </p>
                <div className="u-borderTop--gray">
                  <div className="Info--wrapper flex flexWrap--wrap u-marginTop--30">
                    {externalAppInfo.map((info, i) => {
                      return (
                        <div className="flex flex-column" key={`${info}-${i}`}>
                          <p className="u-fontSize--largest u-color--biscay u-fontWeight--bold u-lineHeight--more"> {info.name} </p>
                          <p className="u-fontSize--small u-color--tundora body-copy u-marginTop--8"> {info.description} </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ExploreSpec;
