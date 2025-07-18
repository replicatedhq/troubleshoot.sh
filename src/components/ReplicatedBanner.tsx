import React from 'react';
import styles from './ReplicatedBanner.module.css';

export default function ReplicatedBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.replicatedLogo}>
          <img 
            src="/img/replicated-logo.svg" 
            alt="Replicated" 
            className={styles.logoImage}
          />
        </div>
        <div className={styles.message}>
          <a 
            href="https://replicated.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.bannerLink}
          >
            Learn more about Replicated to operationalize your application
            <span className={styles.arrow}>›</span>
          </a>
        </div>
      </div>
    </div>
  );
}