import { createElement } from 'react';
import PropTypes from 'prop-types'
import styles from './Layout.module.css';

export default function InlineButton({ onClick, icon }) {
    return (
        <button type="submit" className={styles.inlineBtn} onClick={onClick}>
            {createElement(icon, { onClick })}
        </button>
    )
}

InlineButton.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.func.isRequired
}
