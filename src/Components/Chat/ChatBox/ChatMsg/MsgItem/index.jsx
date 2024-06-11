import { Image } from "antd";
import styles from "./itemmsg.module.scss";
const { VITE_BASE_URL } = import.meta.env

export default function MsgItem({ text, isUser, user, time, isImg = false, image = '' }) {
    return (
        <div
            className={`${styles.msg} ${isUser ? styles.user : ''} mb-3`}
        >
            <div className={styles.msgChildren}>
                <div>
                    <div
                        style={{ display: "block", marginBottom: (!isImg ? '16px' : '0px') }}
                    >
                        {user} : {isImg ? null : text}
                    </div>
                    {isImg ? <div style={{ position: 'unset' }}><Image style={{ objectFit: 'contain', width: '100%', height: '30%%' }} src={`${VITE_BASE_URL}/${image}`} alt="" /></div> : null}
                </div>
                <div>
                    <span style={{ marginTop: '20px' }}>
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
}