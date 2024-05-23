import ListUser from "../ListUser";
import styles from "./sidebar.module.scss";

export default function SideBar() {
    return (
        <div className={`py-4 ${styles.wp}`}>
            <input className={styles.inputSearch} placeholder="Tìm kiếm..." />
            <div className={styles.listItemChat}>
                <ListUser isShowMenu={false} isClickable={false} />
            </div>
        </div>
    );
}