import React from 'react';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

export default function FlexRow({ children }) {
    return (
        <div className={styles.row}>
            {children}
        </div>
    )
}

FlexRow.propTypes = {
    children: PropTypes.node.isRequired
}
