import { createElement } from 'react';
import PropTypes from 'prop-types'
import styles from './Layout.module.css';

export default function InlineButton({ onClick, icon, type = "submit", disabled = false }) {
    return (
        <button type={type} disabled={disabled} className={styles.inlineBtn} onClick={onClick}>
            {createElement(icon)}
        </button>
    )
}

InlineButton.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
}
