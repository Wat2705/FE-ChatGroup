import styles from "./header.module.scss";

export default function Header({
    className = "",
}) {
    return (
        <div className={`${styles.itemChat} ${styles.shadowCs} ${className}`} >
            <div className={styles.infoAndTime}>
                <div>
                    <h3>Public room</h3>
                    <p className={styles.timeOnline}></p>
                </div>
                <div className="d-flex flex-row gap-4 pe-5 text-lg h5">
                    <p>
                        <i className="bi bi-telephone"></i>
                    </p>
                    <p>
                        <i className="bi bi-camera-video"></i>
                    </p>
                    <p>
                        <i className="bi bi-three-dots"></i>
                    </p>
                </div>
            </div>
        </div>
    );
}
