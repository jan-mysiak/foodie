import React from 'react'
import PropTypes from 'prop-types'
import { createElement } from 'react';
import styles from './Layout.module.css';

export default function InlineIcon({ icon, isActive }) {
    return (
        <>
            {createElement(icon, {
                className: isActive ? styles.inlineIcon_active : styles.inlineIcon
            })}
        </>
    )
}


InlineIcon.propTypes = {
    icon: PropTypes.func.isRequired,
    isActive: PropTypes.string
}

