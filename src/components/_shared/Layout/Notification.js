import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from "./Layout.module.css";
import { FaExclamationCircle } from 'react-icons/fa';

// Might want to set this in the store eventually
const DEFAULT_DELAY = 3000;

export default function Notification() {
    const { notificationMessage } = useSelector(s => s.ui);
    const ref = useRef(null);

    // Currently only used to display errors
    useEffect(() => {
        if (notificationMessage && ref.current) {
            ref.current.style.display = "flex";

            // Handle notification types here if needed
            ref.current.className = styles.error;

            // Fade out after a delay
            setTimeout(() => {
                ref.current.className = styles.notification;
            }, DEFAULT_DELAY);

            // Remove element from DOM once transition completes to prevent unexpected behaviour
            setTimeout(() => {
                ref.current.style.display = "none";
            }, DEFAULT_DELAY + 350);
        }
    }, [notificationMessage, ref]);

    return (
        <div className={styles.notification} ref={ref}>
            <FaExclamationCircle size="24" className={styles.icon} />
            {notificationMessage}
        </div>
    )
}
