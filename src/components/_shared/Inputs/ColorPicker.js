import React from 'react';
import PropTypes from 'prop-types';
import styles from './Inputs.module.css';

export default function ColorPicker({ children }) {
    return (
        <div className={styles.colorPicker}>
            {children}
        </div>
    )
}

ColorPicker.propTypes = {
    children: PropTypes.node
}
