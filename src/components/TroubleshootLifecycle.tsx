import React from 'react';
import styles from './TroubleshootLifecycle.module.css';
import indexStyles from '../pages/index.module.css';

export default function TroubleshootLifecycle() {
  return (
    <div className={styles.lifecycle}>
      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <span className={`${indexStyles.icon} ${indexStyles.preflightChecksIcon}`}></span>
          </div>
          <h3 className={styles.stepTitle}>Preflight checks</h3>
          <p className={styles.stepDescription}>
            Collectors and Analyzers validate before installation.
          </p>
        </div>
        
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <span className={`${indexStyles.icon} ${indexStyles.deployAppIcon}`}></span>
          </div>
          <h3 className={styles.stepTitle}>Deploy your app</h3>
          <p className={styles.stepDescription}>
            Application is deployed to your customers.
          </p>
        </div>
        
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <span className={`${indexStyles.icon} ${indexStyles.supportBundleIcon}`}></span>
          </div>
          <h3 className={styles.stepTitle}>Support bundle</h3>
          <p className={styles.stepDescription}>
            Collect logs and analyze environment for diagnosis.
          </p>
        </div>
        
        <div className={styles.step}>
          <div className={styles.stepIcon}>
            <span className={`${indexStyles.icon} ${indexStyles.tblshootYamlDoc}`}></span>
          </div>
          <h3 className={styles.stepTitle}>Send to vendor</h3>
          <p className={styles.stepDescription}>
            Share your bundle with a vendor for support.
          </p>
        </div>
      </div>
      
      <div className={styles.statusContainer}>
        <div className={styles.statusStep}>
          <div className={styles.statusNumber}>1</div>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>
              <span className={`${indexStyles.icon} ${indexStyles.greenCheckmarkIcon}`}></span>
            </div>
            <span className={styles.statusText}>Check pass</span>
          </div>
        </div>
        
        <div className={styles.arrow}></div>
        
        <div className={styles.statusStep}>
          <div className={styles.statusNumber}>2</div>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>
              <span className={`${indexStyles.icon} ${indexStyles.redWarningIcon}`}></span>
            </div>
            <span className={styles.statusText}>Customer issue</span>
          </div>
        </div>
        
        <div className={styles.arrow}></div>
        
        <div className={styles.statusStep}>
          <div className={styles.statusNumber}>3</div>
          <div className={styles.statusItem}>
            <div className={styles.statusIcon}>
              <span className={`${indexStyles.icon} ${indexStyles.repeatCycleIcon}`}></span>
            </div>
            <span className={styles.statusText}>Escalation needed</span>
          </div>
        </div>
        
        <div className={styles.arrow}></div>
        
        <div className={styles.statusStep}>
          <div className={styles.statusNumber}>4</div>
        </div>
      </div>
    </div>
  );
}