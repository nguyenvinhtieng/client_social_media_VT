import styles from "./notification.module.css";
function NotificationItem() {
    return (
        <li>
            <a href="/" className={styles.notificationItem}>
                <div className="avatar-sm">
                    <img
                        src="https://www.w3schools.com/w3images/avatar6.png"
                        alt=""
                    />
                </div>
                <div className={styles.notificationContent}>
                    <div className={styles.notificationText}>
                        Lorem ipsum dolor sit amet consectetur.
                    </div>
                    <div className={styles.notificationTime}>09:30am</div>
                </div>
            </a>
        </li>
    );
}

export default NotificationItem;
