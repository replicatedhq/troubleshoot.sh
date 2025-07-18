import React from "react"
import { Link } from "gatsby"

const DocsSidebar = () => {
  const sidebarSections = [
    {
      title: "Overview",
      items: [
        { title: "Getting Started", path: "/docs/" }
      ]
    },
    {
      title: "Preflight Checks",
      items: [
        { title: "Introduction", path: "/docs/preflight/introduction" },
        { title: "Cluster Checks", path: "/docs/preflight/cluster-checks" },
        { title: "Node Checks", path: "/docs/preflight/node-checks" },
        { title: "Next Steps", path: "/docs/preflight/next-steps" },
        { title: "CLI Usage", path: "/docs/preflight/cli-usage" },
        { title: "Exit Codes", path: "/docs/preflight/exit-codes" },
      ]
    },
    {
      title: "Support Bundle",
      items: [
        { title: "Introduction", path: "/docs/support-bundle/introduction" },
        { title: "Collecting", path: "/docs/support-bundle/collecting" },
        { title: "Support Bundle", path: "/docs/support-bundle/supportbundle" },
        { title: "Discover Cluster Specs", path: "/docs/support-bundle/discover-cluster-specs" },
      ]
    },
    {
      title: "Collect",
      items: [
        { title: "Overview", path: "/docs/collect/" },
        { title: "Collectors", path: "/docs/collect/collectors" },
        { title: "All", path: "/docs/collect/all" },
        { title: "Ceph", path: "/docs/collect/ceph" },
        { title: "Certificates", path: "/docs/collect/certificates" },
        { title: "Cluster Info", path: "/docs/collect/cluster-info" },
        { title: "Cluster Resources", path: "/docs/collect/cluster-resources" },
        { title: "Collectd", path: "/docs/collect/collectd" },
        { title: "Copy", path: "/docs/collect/copy" },
        { title: "Copy From Host", path: "/docs/collect/copy-from-host" },
        { title: "DNS", path: "/docs/collect/dns" },
        { title: "Etcd", path: "/docs/collect/etcd" },
        { title: "Exec", path: "/docs/collect/exec" },
        { title: "Goldpinger", path: "/docs/collect/goldpinger" },
        { title: "Helm", path: "/docs/collect/helm" },
        { title: "HTTP", path: "/docs/collect/http" },
        { title: "ConfigMap", path: "/docs/collect/configmap" },
        { title: "Custom Metrics", path: "/docs/collect/custom-metrics" },
        { title: "Node Metrics", path: "/docs/collect/node-metrics" },
        { title: "Secret", path: "/docs/collect/secret" },
        { title: "Longhorn", path: "/docs/collect/longhorn" },
        { title: "MSSQL", path: "/docs/collect/mssql" },
        { title: "MySQL", path: "/docs/collect/mysql" },
        { title: "Logs", path: "/docs/collect/logs" },
        { title: "PostgreSQL", path: "/docs/collect/postgresql" },
        { title: "Redis", path: "/docs/collect/redis" },
        { title: "Registry Images", path: "/docs/collect/registry-images" },
        { title: "Run Pod", path: "/docs/collect/run-pod" },
        { title: "Run Daemonset", path: "/docs/collect/run-daemonset" },
        { title: "Data", path: "/docs/collect/data" },
        { title: "Sonobuoy", path: "/docs/collect/sonobuoy" },
        { title: "Sysctl", path: "/docs/collect/sysctl" },
      ]
    },
    {
      title: "Redact",
      items: [
        { title: "Overview", path: "/docs/redact/" },
        { title: "Redactors", path: "/docs/redact/redactors" },
        { title: "API Tokens", path: "/docs/redact/api-tokens" },
        { title: "AWS Credentials", path: "/docs/redact/aws-credentials" },
        { title: "Generic Connection Strings", path: "/docs/redact/generic-connection-strings" },
        { title: "Database Connection Strings", path: "/docs/redact/database-connection-strings" },
        { title: "IP Addresses", path: "/docs/redact/ip-addresses" },
        { title: "Passwords", path: "/docs/redact/passwords" },
        { title: "Usernames", path: "/docs/redact/usernames" },
      ]
    },
    {
      title: "Analyze", 
      items: [
        { title: "Overview", path: "/docs/analyze/" },
        { title: "Analyzers", path: "/docs/analyze/analyzers" },
        { title: "Outcomes", path: "/docs/analyze/outcomes" },
        { title: "Ceph Status", path: "/docs/analyze/ceph-status" },
        { title: "Certificates", path: "/docs/analyze/certificates" },
        { title: "Cluster Pod Statuses", path: "/docs/analyze/cluster-pod-statuses" },
        { title: "Cluster Container Statuses", path: "/docs/analyze/cluster-container-statuses" },
        { title: "Cluster Resource", path: "/docs/analyze/cluster-resource" },
        { title: "Cluster Version", path: "/docs/analyze/cluster-version" },
        { title: "Container Runtime", path: "/docs/analyze/container-runtime" },
        { title: "CRD", path: "/docs/analyze/crd" },
        { title: "Deployment Status", path: "/docs/analyze/deployment-status" },
        { title: "Event", path: "/docs/analyze/event" },
        { title: "Goldpinger", path: "/docs/analyze/goldpinger" },
        { title: "HTTP", path: "/docs/analyze/http" },
        { title: "Image Pull Secrets", path: "/docs/analyze/image-pull-secrets" },
        { title: "Ingress", path: "/docs/analyze/ingress" },
        { title: "Job Status", path: "/docs/analyze/job-status" },
        { title: "JSON Compare", path: "/docs/analyze/json-compare" },
        { title: "Distribution", path: "/docs/analyze/distribution" },
        { title: "Node Metrics", path: "/docs/analyze/node-metrics" },
        { title: "Secrets", path: "/docs/analyze/secrets" },
        { title: "Longhorn", path: "/docs/analyze/longhorn" },
        { title: "MSSQL", path: "/docs/analyze/mssql" },
        { title: "MySQL", path: "/docs/analyze/mysql" },
        { title: "Node Resources", path: "/docs/analyze/node-resources" },
        { title: "PostgreSQL", path: "/docs/analyze/postgresql" },
        { title: "Redis", path: "/docs/analyze/redis" },
        { title: "Regex", path: "/docs/analyze/regex" },
        { title: "ReplicaSet Status", path: "/docs/analyze/replicaset-status" },
        { title: "Storage Class", path: "/docs/analyze/storage-class" },
        { title: "ConfigMaps", path: "/docs/analyze/configmaps" },
        { title: "YAML Compare", path: "/docs/analyze/yaml-compare" },
        { title: "Registry Images", path: "/docs/analyze/registry-images" },
        { title: "Weave Report", path: "/docs/analyze/weave-report" },
        { title: "StatefulSet Status", path: "/docs/analyze/statefulset-status" },
        { title: "Sysctl", path: "/docs/analyze/sysctl" },
        { title: "Velero", path: "/docs/analyze/velero" },
      ]
    },
    {
      title: "Host Collect and Analyze",
      items: [
        { title: "Overview", path: "/docs/host-collect-analyze/overview" },
        { title: "All", path: "/docs/host-collect-analyze/all" },
        { title: "Block Devices", path: "/docs/host-collect-analyze/blockDevices" },
        { title: "Cgroups", path: "/docs/host-collect-analyze/cgroups" },
        { title: "Copy", path: "/docs/host-collect-analyze/copy" },
        { title: "CPU", path: "/docs/host-collect-analyze/cpu" },
        { title: "Certificate", path: "/docs/host-collect-analyze/certificate" },
        { title: "Certificates Collection", path: "/docs/host-collect-analyze/certificatesCollection" },
        { title: "DNS", path: "/docs/host-collect-analyze/dns" },
        { title: "Disk Usage", path: "/docs/host-collect-analyze/diskUsage" },
        { title: "Filesystem Performance", path: "/docs/host-collect-analyze/filesystemPerformance" },
        { title: "Host OS", path: "/docs/host-collect-analyze/hostOS" },
        { title: "Host Services", path: "/docs/host-collect-analyze/hostServices" },
        { title: "HTTP Load Balancer", path: "/docs/host-collect-analyze/httpLoadBalancer" },
        { title: "IPv4 Interfaces", path: "/docs/host-collect-analyze/ipv4Interfaces" },
        { title: "Journald", path: "/docs/host-collect-analyze/journald" },
        { title: "Kernel Configs", path: "/docs/host-collect-analyze/kernelConfigs" },
        { title: "Memory", path: "/docs/host-collect-analyze/memory" },
        { title: "Network Namespace Connectivity", path: "/docs/host-collect-analyze/networkNamespaceConnectivity" },
        { title: "Regex", path: "/docs/host-collect-analyze/regex" },
        { title: "Run", path: "/docs/host-collect-analyze/run" },
        { title: "Subnet Available", path: "/docs/host-collect-analyze/subnetAvailable" },
        { title: "Sysctl", path: "/docs/host-collect-analyze/sysctl" },
        { title: "System Packages", path: "/docs/host-collect-analyze/systemPackages" },
        { title: "TCP Connect", path: "/docs/host-collect-analyze/tcpConnect" },
        { title: "TCP Load Balancer", path: "/docs/host-collect-analyze/tcpLoadBalancer" },
        { title: "TCP Port Status", path: "/docs/host-collect-analyze/tcpPortStatus" },
        { title: "Time", path: "/docs/host-collect-analyze/time" },
        { title: "UDP Port Status", path: "/docs/host-collect-analyze/udpPortStatus" },
        { title: "Subnet Contains IP", path: "/docs/host-collect-analyze/subnetcontainsip" },
      ]
    }
  ]

  return (
    <aside className="docs-sidebar">
      <h3>Documentation</h3>
      
      {sidebarSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="sidebar-section">
          <h4 className="sidebar-section-title">{section.title}</h4>
          <div className="sidebar-section-links">
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link 
                    to={item.path}
                    activeClassName="active"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      
      {/* Quick Links */}
      <div className="sidebar-section">
        <h4 className="sidebar-section-title">Quick Links</h4>
        <div className="sidebar-section-links">
          <ul>
            <li>
              <a 
                href="https://github.com/replicatedhq/troubleshoot"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/replicatedhq/troubleshoot/tree/main/examples"
                target="_blank"
                rel="noopener noreferrer"
              >
                Examples →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default DocsSidebar 