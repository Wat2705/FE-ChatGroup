import styles from "./accountItem.module.scss";

export default function AccountItem({
    title = '',
    time = "",
    img = "",
    lastMsg = "",
    className = "",
}) {
    return (
        <div className={`${styles.itemChat} ${className}`} >
            <img src={img} alt="Hình ảnh avatar" />
            <div className={styles.infoAndTime}>
                <div>
                    <h3>{title}</h3>
                    <p>{lastMsg}</p>
                </div>
                <div>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
}
