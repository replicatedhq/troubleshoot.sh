import React from "react"

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: "#f8f9fa", 
      padding: "3rem 2rem 2rem", 
      borderTop: "1px solid #e1e5e9",
      marginTop: "auto"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "2rem"
      }}>
        <div>
          <p style={{ 
            margin: 0, 
            color: "#6c757d",
            fontSize: "0.875rem"
          }}>
            © 2024 Replicated, Inc. Troubleshoot.sh - Debug Kubernetes applications
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "2rem" }}>
          <a 
            href="https://github.com/replicatedhq/troubleshoot" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#6c757d", 
              textDecoration: "none",
              fontSize: "0.875rem"
            }}
          >
            GitHub
          </a>
          <a 
            href="https://replicated.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#6c757d", 
              textDecoration: "none",
              fontSize: "0.875rem"
            }}
          >
            Replicated
          </a>
          <a 
            href="https://docs.replicated.com/troubleshoot/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#6c757d", 
              textDecoration: "none",
              fontSize: "0.875rem"
            }}
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
