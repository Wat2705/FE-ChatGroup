import { useSelector } from "react-redux";
import styles from "../chatbox.module.scss";
import MsgItem from "./MsgItem";

export default function ChatMsg() {
    const allMessage = useSelector(state => state.chat.allMessage);

    return (
        <div id="msg-container" className={`${styles.renderChat} py-2 px-5`}>
            {allMessage?.map((e, i) => {
                return <MsgItem
                    key={i}
                    isUser={e.isSender}
                    text={e.msg}
                    user={e.user}
                    time={e.time}
                    className={e.isSender ? "cia" : ''}
                    isImg={e.msg.includes('data:image')}
                />
            })}
        </div>
    )
}