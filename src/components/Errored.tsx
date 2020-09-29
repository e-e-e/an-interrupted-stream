import React from 'react';
import styles from './errored.module.css';

export function Errored() {
  return (
    <div className={styles.root}>
      <div className={styles.indicator}>snap</div>
    </div>
  );
}
