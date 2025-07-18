import React from "react"
import { Link } from "gatsby"

const NavBar = ({ isMobile = false, title }) => {
  return (
    <nav className="navbar u-padding--20 u-borderBottom--1 u-background--white">
      <div className="flex justifyContent--spaceBetween alignItems--center container">
        <Link 
          to="/" 
          className="u-fontSize--jumbo u-fontWeight--bold u-color--royalBlue"
        >
          Troubleshoot.sh
        </Link>
        
        {!isMobile ? (
          <div className="flex" style={{ gap: "2rem" }}>
            <Link 
              to="/explore" 
              className="nav-link u-color--tuna"
            >
              Explore
            </Link>
            <Link 
              to="/docs" 
              className="nav-link u-color--tuna"
            >
              Docs
            </Link>
            <Link 
              to="/preflight" 
              className="nav-link u-color--tuna"
            >
              Preflight
            </Link>
            <Link 
              to="/support-bundle" 
              className="nav-link u-color--tuna"
            >
              Support Bundle
            </Link>
          </div>
        ) : (
          <div className="mobile-nav">
            {/* Mobile navigation - can be expanded later */}
            <button className="mobile-menu-button u-background--none u-border--none u-fontSize--largest u-color--tuna">
              ☰
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
