import { storeMessage } from "@/redux/chat";
import axiosInstance from "@/config/axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../chatbox.module.scss";
import MsgItem from "./MsgItem";

export default function ChatMsg() {
    const allMessage = useSelector((state) => state.chat.allMessage);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.id);

    useEffect(() => {
        axiosInstance.get('/message/all')
            .then((res) => {
                dispatch(storeMessage(res.data));
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }, [dispatch]);

    useEffect(() => {
        const msgContainer = document.querySelector('#msg-container');
        if (msgContainer) {
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    }, [allMessage]);

    return (
        <div id="msg-container" className={`${styles.renderChat} py-2 px-5`}>
            {allMessage?.map((e, i) => {
                return (
                    <MsgItem
                        key={i}
                        isUser={e?.senderId?._id === userId}
                        text={e?.content}
                        user={e?.senderId?._id === userId ? 'Tôi' : e?.senderId?.name}
                        time={dayjs(e?.created_at).format('hh:mm')}
                        className={e?.senderId?._id === userId ? "cia" : ''}
                        isImg={e?.content === undefined}
                        image={e?.content === undefined ? e?.imageId?.path : null}
                    />
                );
            })}
        </div>
    );
}