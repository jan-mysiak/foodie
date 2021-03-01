import PropTypes from 'prop-types';
import styles from './Inputs.module.css'

export default function ColorItem({ isActive, id, hex, onClick }) {
    const handleClick = (e) => {
        e.target.scrollIntoView({ behaviour: "smooth", inline: "center", block: "center" });
        onClick();
    }

    return (
        <div
            className={isActive ? styles.colorItem_active : styles.colorItem}
            onClick={handleClick}
            style={{ background: hex }}
        />
    )
}

ColorItem.propTypes = {
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    hex: PropTypes.string.isRequired,
}

