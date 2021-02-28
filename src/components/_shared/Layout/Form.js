import React from 'react'
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

export default function Form(props) {
    const { isDisabled, onSubmit } = props;

    return (
        <form
            className={isDisabled ? styles.form_disabled : styles.form}
            onSubmit={onSubmit}
        >
            {props.children}
        </form>
    )
}

Form.propTypes = {
    isDisabled: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

