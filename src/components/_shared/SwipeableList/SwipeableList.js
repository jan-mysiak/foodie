import React from 'react';
import styles from './SwipeableList.module.css';
import PropTypes from 'prop-types';

export default function SwipeableList({ children }) {
    if (!children.length) {
        return (
            <div className={styles.placeholder}>
                Inga resultat..
            </div>
        )
    }

    return (
        <ul className={styles.list}>
            {children}
        </ul>
    )
}

SwipeableList.propTypes = {
    children: PropTypes.node.isRequired
}
