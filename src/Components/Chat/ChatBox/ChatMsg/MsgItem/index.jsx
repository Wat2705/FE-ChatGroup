import styles from "./itemmsg.module.scss";
import IsViewImg from "@/assets/img/Vector.png";

export default function MsgItem({ text, isUser, isView, user }) {
    return (
        <div
            className={`${styles.msg} ${isUser ? styles.user : ''} mb-3`}
        >
            <div className={styles.msgChildren}>
                <div>
                    <p>{user} : {text}</p>
                </div>
                <div>
                    <span>
                        19:57
                        {isView && (
                            <img className="ms-2" src={IsViewImg} alt="" />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}