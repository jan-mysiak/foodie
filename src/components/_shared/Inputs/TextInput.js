import React from 'react';
import PropTypes from 'prop-types';
import styles from './Inputs.module.css';

export default function TextInput({ placeholder, onChange, value }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            value={value}
            className={styles.textInput}
        />
    )
}

TextInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

