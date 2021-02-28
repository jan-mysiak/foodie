import React from 'react';
import styles from './SwipeableList.module.css';

export default function SwipeableList(props) {
    return (
        <ul className={styles.list}>
            {props.children}
        </ul>
    )
}
