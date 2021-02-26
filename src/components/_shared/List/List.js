import React from 'react'
import ListItem from './ListItem';
import styles from './List.module.css';
import useList from './hooks/useList';
import PropTypes from 'prop-types';

export default function List(props) {
    let { items, onDelete, onConfirm, placeholder = "Inga resultat..", status } = props;
    const { handleRemove, removeId, listItems } = useList(items, status);

    if (!listItems.length) {
        return <div className={styles.placeholder}>{placeholder}</div>
    }

    return (
        <div className={styles.list}>
            {listItems.map(item =>
                <ListItem
                    item={item}
                    key={item.id}
                    remove={removeId === item.id}
                    onDelete={onDelete ? () => handleRemove(item, onDelete) : null}
                    onConfirm={onConfirm ? () => handleRemove(item, onConfirm) : null}
                />
            )}
        </div>
    )
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onConfirm: PropTypes.func,
    placeholder: PropTypes.string,
}