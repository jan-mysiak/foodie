import styles from './Layout.module.css';

export default function ActionsContainer({ children, height }) {
    return (
        <div
            className={styles.actionsContainer}
            style={{ minHeight: `${height}rem` }}
        >
            {children}
        </div>
    )
}
