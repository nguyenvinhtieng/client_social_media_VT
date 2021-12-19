import styles from "./loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingMain}>
                <div className={styles.loadingCircle}></div>
                {/* <div className={styles.loadingText}>Loading</div> */}
            </div>
        </div>
    );
};
export default Loading;
