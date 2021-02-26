import React from 'react'
import PropTypes from 'prop-types'
import { createElement } from 'react';
import styles from './Layout.module.css';

export default function InlineIcon({ icon, isActive, hasError }) {
    const iconClass = () => {
        if (hasError) {
            return styles.inlineIcon_error;
        }
        else if (isActive) {
            return styles.inlineIcon_active;
        }
        else {
            return styles.inlineIcon;
        }
    }

    return (
        <>
            {createElement(icon, {
                className: iconClass(),
                style: { fontSize: "3rem" }
            })}
        </>
    )
}


InlineIcon.propTypes = {
    icon: PropTypes.func.isRequired,
    isActive: PropTypes.string,
    hasError: PropTypes.string
}

