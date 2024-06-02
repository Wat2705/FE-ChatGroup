import { toggleSetting } from "@/redux/toggle";
import { PhoneOutlined, SettingOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import styles from "./header.module.scss";

export default function Header({ className = "" }) {
    const dispatch = useDispatch()
    return (
        <div className={`${styles.itemChat} ${styles.shadowCs} ${className}`} >
            <div className={styles.infoAndTime}>
                <div>
                    <h3>Public room</h3>
                    <p className={styles.timeOnline}></p>
                </div>
                <div className="d-flex flex-row gap-4 pe-2">
                    <Button style={{ border: 0 }} icon={<PhoneOutlined />}></Button>
                    <Button style={{ border: 0 }} icon={<VideoCameraOutlined />}></Button>
                    <Button onClick={() => dispatch(toggleSetting())} style={{ border: 0 }} icon={<SettingOutlined />}></Button>
                </div>
            </div>
        </div>
    );
}
