import React from 'react'
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

export default function NavMenu(props) {
    const { items, isActive, currentLocation } = props;

    const LogoutLink = () => (
        <Link className={styles.logoutLink} to="/">
            Logga ut
        </Link>
    )

    const navLinks = Object.keys(items).map(n =>
        <li key={n} className={currentLocation === n ? styles.navLink_active : styles.navLink}>
            <Link to={n}>
                {items[n]}
            </Link>
        </li>
    )

    return (
        <ul className={isActive ? styles.navMenu_active : styles.navMenu}>
            {navLinks}
            <LogoutLink />
        </ul>
    )
}

NavMenu.propTypes = {
    items: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    currentLocation: PropTypes.string.isRequired
}

