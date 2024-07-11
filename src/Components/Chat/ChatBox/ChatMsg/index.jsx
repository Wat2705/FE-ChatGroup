import { storeMessage } from "@/redux/chat";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../chatbox.module.scss";
import MsgItem from "./MsgItem";

export default function ChatMsg() {
    const allMessage = useSelector(state => state.chat.allMessage)
    const dispatch = useDispatch()
    let userId = useSelector(state => state.auth.id)

    useEffect(() => {
        axios({
            url: '/message/all',
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            dispatch(storeMessage(res.data))
        })
    }, [])

    useEffect(() => {
        document.querySelector('#msg-container').scrollTop = document.querySelector('#msg-container').scrollHeight
    }, [allMessage])

    return (
        <div id="msg-container" className={`${styles.renderChat} py-2 px-5`}>
            {allMessage?.map((e, i) => {
                return <MsgItem
                    key={i}
                    isUser={e.senderId['_id'] == userId}
                    text={e.content}
                    user={e.senderId['_id'] == userId ? 'Tôi' : e.senderId['name']}
                    time={dayjs(e.created_at).format('hh:mm')}
                    className={e.senderId['_id'] == userId ? "cia" : ''}
                    isImg={e.content == undefined}
                    image={(e.content == undefined ? e?.imageId?.path : null)}
                />
            })}
        </div>
    )
}