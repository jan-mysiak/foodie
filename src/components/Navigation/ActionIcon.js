import { createElement } from 'react'
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';

function ActionIcon(props) {
    const { icon, isActive, onClick } = props;

    return (
        <>
            {createElement(icon, {
                className: isActive ? styles.actionIcon_active : styles.actionIcon,
                onClick
            })}
        </>
    )
}

ActionIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    icon: PropTypes.func.isRequired,
}

export default ActionIcon

