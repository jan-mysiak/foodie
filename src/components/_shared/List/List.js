import React from 'react';
import PropTypes from 'prop-types';
import styles from "./List.module.css";

export default function List(props) {
    const { items } = props;
    const ref = React.useRef(null);

    const listItems = items.map((item, key) =>
        <li className={styles.listItem} key={key}>
            <div className={styles.content}>
                <h4 className={styles.name}>
                    Name
                </h4>
                <p className={styles.description}>
                    Description
                </p>
            </div>

            <div
                className={styles.categoryColor}
                style={{ background: key % 2 === 0 ? "lime" : "red" }}
            />
        </li>
    )

    if (!items.length) {
        return null;
    }
    else {
        return (
            <ul ref={ref} className={styles.list}>
                {listItems}
            </ul >
        )
    }
}

List.propTypes = {
    items: PropTypes.array.isRequired,
}


