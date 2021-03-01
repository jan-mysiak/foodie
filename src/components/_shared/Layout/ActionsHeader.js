import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import InlineButton from './InlineButton';
import { FaChevronLeft } from 'react-icons/fa';

export default function ActionsHeader({ onBack, content }) {
    return (
        <div className={styles.actionsHeader}>
            <InlineButton
                type="button"
                icon={FaChevronLeft}
                onClick={() => onBack && onBack()}
            />
            <div className={styles.headerContent}>
                {content}
            </div>
        </div>
    )
}

ActionsHeader.propTypes = {
    content: PropTypes.node.isRequired,
    onBack: PropTypes.func,
}
