import { useSelector } from 'react-redux';
import styles from './Layout.module.css';

export default function ActionsContainer({ children, height }) {
    const { actionsHeight } = useSelector(s => s.ui);

    return (
        <div
            className={styles.actionsContainer}
            style={{ minHeight: `${actionsHeight}rem` }}
        >
            {children}
        </div>
    )
}
