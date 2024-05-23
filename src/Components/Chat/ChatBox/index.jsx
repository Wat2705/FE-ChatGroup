import ChatInput from "./ChatInput";
import ChatMsg from "./ChatMsg";
import styles from "./chatbox.module.scss";

export default function ChatBox() {
    return (
        <>
            <div className={styles.wp}>
                <div className={styles.children}>
                    {/* Chat Msg */}
                    <ChatMsg />
                    {/* Input */}
                    <ChatInput />
                </div>
            </div>
        </>
    );
}
