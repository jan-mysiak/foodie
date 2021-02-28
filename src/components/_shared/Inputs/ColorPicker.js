import React from 'react';
import PropTypes from 'prop-types';
import styles from './Inputs.module.css';

function ColorPicker(props) {
    const { items, selectedId, onSelect } = props;

    const colorItems = items.map(i => (
        <div
            key={i.id}
            onClick={() => onSelect(i)}
            style={{ background: i.hex }}
            className={i.id === selectedId ? styles.colorItem_active : styles.colorItem}
        />
    ))

    return (
        <div className={styles.colorPicker}>
            {colorItems}
        </div>
    )
}

ColorPicker.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
}

export default ColorPicker

