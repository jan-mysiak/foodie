import React from 'react'
import PropTypes from 'prop-types'
import styles from './Navigation.module.css';

function MenuToggle(props) {
    const { isActive, currentPage, onClick } = props;

    return (
        <div
            className={isActive ? styles.menuToggle_active : styles.menuToggle}
            onClick={onClick}
        >
            <div className={styles.hamburger}>
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
            </div>
            <div className={styles.currentPage}>
                {currentPage}
            </div>
        </div>
    )
}

MenuToggle.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    currentPage: PropTypes.string,
}

export default MenuToggle

