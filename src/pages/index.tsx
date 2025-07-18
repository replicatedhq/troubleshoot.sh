import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TroubleshootLifecycle from '../components/TroubleshootLifecycle';
import styles from './index.module.css';

function TroubleshootLanding() {
  const { siteConfig } = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState('preflight-checks');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout
      title={`${siteConfig.title} - Kubernetes Diagnostics`}
      description="A kubectl plugin providing diagnostic tools for Kubernetes applications">
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.maxWidth}>
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <div className={styles.troubleshootLogo}>
                  <img 
                    src="/img/troubleshoot.svg" 
                    alt="Troubleshoot" 
                    className={styles.logoImage}
                  />
                </div>
                <p className={styles.heroDescription}>
                  A kubectl plugin providing diagnostic tools for Kubernetes applications
                </p>
                <div className={styles.heroButtons}>
                  <button 
                    className={`${styles.button} ${styles.primary}`}
                    onClick={() => scrollToSection('preflightSection')}
                  >
                    <span>Learn how it works</span>
                  </button>
                  <Link 
                    to="/docs/preflight/introduction" 
                    className={`${styles.button} ${styles.secondary}`}
                  >
                    <span>Get started</span>
                  </Link>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.demoContainer}>
                  <img 
                    src={activeTab === 'preflight-checks' ? '/img/preflight.gif' : '/img/support-bundle.gif'}
                    alt={activeTab === 'preflight-checks' ? 'Preflight Checks Demo' : 'Support Bundle Demo'}
                    className={styles.demoGif}
                  />
                  <div className={styles.tabsContainer}>
                    <button 
                      className={`${styles.tab} ${activeTab === 'preflight-checks' ? styles.activeTab : ''}`}
                      onClick={() => setActiveTab('preflight-checks')}
                    >
                      Preflight checks
                    </button>
                    <button 
                      className={`${styles.tab} ${activeTab === 'support-bundle' ? styles.activeTab : ''}`}
                      onClick={() => setActiveTab('support-bundle')}
                    >
                      Support bundle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className={styles.lifecycleSection}>
        <div className={styles.container}>
          <div className={styles.contain700}>
            <p className={styles.sectionTitle}>
              Codify your support analysis to run offline and enable your customers to self-remediate
            </p>
          </div>
          <div className={styles.contain1280}>
            <div className={styles.lifecycleContainer}>
              <TroubleshootLifecycle />
            </div>
          </div>
        </div>
      </section>

      {/* Preflight Section */}
      <section className={styles.preflightSection} id="preflightSection">
        <div className={styles.container}>
          <div className={styles.contain700}>
            <div className={styles.sectionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={styles.sectionTitle}>
              Validate an environment before an application is installed to prevent common errors
            </p>
          </div>
          <div className={styles.contain1280}>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <img src="/img/analyze_individual.svg" alt="Analyze" className={styles.featureIconImage} />
                    <span className={styles.illustrationText}>Analyze</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureDescription}>
                    Without installing anything to the cluster, Preflight analyzes the environment, 
                    comparing it to your requirements.
                  </p>
                  <Link to="/docs/analyze" className={styles.featureLink}>
                    Explore analyzers
                  </Link>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <img src="/img/collect_individual.svg" alt="Report" className={styles.featureIconImage} />
                    <span className={styles.illustrationText}>Report</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureDescription}>
                    A visual report is generated to highlight where the environment doesn't meet your requirements.
                  </p>
                  <Link to="/docs/preflight/node-checks" className={styles.featureLink}>
                    Learn more about reporting
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.ctaContainer}>
              <Link to="/docs/preflight/introduction" className={`${styles.button} ${styles.secondary}`}>
                Get started writing Preflight Checks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Bundle Section */}
      <section className={styles.supportSection} id="supportSection">
        <div className={styles.container}>
          <div className={styles.contain700}>
            <div className={styles.sectionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15A2 2 0 0 1 19 17H5A2 2 0 0 1 3 15V5A2 2 0 0 1 5 3H19A2 2 0 0 1 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={styles.sectionTitle}>
              When something isn't working right, eliminate the back and forth, async debugging by collecting everything at once
            </p>
          </div>
          <div className={styles.contain1280}>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <img src="/img/collect_individual.svg" alt="Collect" className={styles.featureIconImage} />
                    <span className={styles.illustrationText}>Collect</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureDescription}>
                    Without installing anything in to the cluster, data is collected from your application 
                    based on what was defined in your collector.
                  </p>
                  <Link to="/docs/collect" className={styles.featureLink}>
                    Explore collectors
                  </Link>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <img src="/img/redact_individual.svg" alt="Redact" className={styles.featureIconImage} />
                    <span className={styles.illustrationText}>Redact</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureDescription}>
                    Sensitive information is redacted from a support bundle and is never stored, 
                    keeping your data safe and secure.
                  </p>
                  <Link to="/docs/redact" className={styles.featureLink}>
                    Learn about redacting
                  </Link>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <img src="/img/analyze_individual.svg" alt="Analyze" className={styles.featureIconImage} />
                    <span className={styles.illustrationText}>Analyze</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <p className={styles.featureDescription}>
                    Without installing anything to the cluster, your Support bundle is analyzed and 
                    insights are surfaced to help you debug and resolve issues.
                  </p>
                  <Link to="/docs/analyze" className={styles.featureLink}>
                    Explore analyzers
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.ctaContainer}>
              <Link to="/docs/support-bundle/introduction" className={`${styles.button} ${styles.secondary}`}>
                Get started writing Support Bundles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TroubleshootLanding;