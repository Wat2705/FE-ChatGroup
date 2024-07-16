import { useSelector } from "react-redux";
import ListUser from "../ListUser";
import styles from "./sidebar.module.scss";

export default function SideBar() {
    const online = useSelector(state => state.chat.online);

    return (
        <div className={`py-4 ${styles.wp}`}>
            <div>Online: {online}</div>
            <div className={styles.listItemChat}>
                <ListUser isShowMenu={false} isClickable={false} />
            </div>
        </div>
    );
}