import React from 'react';
import styles from './Layout.module.css';

export default function FlexRow({ children }) {
    return (
        <div className={styles.row}>
            {children}
        </div>
    )
}
