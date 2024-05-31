import styles from "./itemmsg.module.scss";
import IsViewImg from "@/assets/img/Vector.png";

export default function MsgItem({ text, isUser, isView, user, time, isImg = false }) {
    return (
        <div
            className={`${styles.msg} ${isUser ? styles.user : ''} mb-3`}
        >
            <div className={styles.msgChildren}>
                <div>
                    <p>{user} : {isImg ? <img style={{ objectFit: 'contain', width: '100%' }} src={text} alt="" /> : text}</p>
                </div>
                <div>
                    <span style={{ marginTop: '20px' }}>
                        {time}
                        {isView && (
                            <img className="ms-2" src={IsViewImg} alt="" />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}