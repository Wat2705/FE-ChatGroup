import { socket } from "@/config/socket";
import { sendingMessage } from "@/redux/chat";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import styles from "../chatbox.module.scss";
import dayjs from "dayjs";

export default function ChatInput() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const handleSubmit = (data) => {
        let time = dayjs(new Date()).format('hh:mm')
        if (data.msg != '' && data.msg != undefined) {
            dispatch(sendingMessage({
                msg: data.msg,
                user: 'Tôi',
                time
            }))
            socket.emit('sendMessagePublic', {
                msg: data.msg,
                time
            })
            form.setFieldValue('msg', '')
        }
    }

    return (
        <Form className={styles.inputChat} form={form} onFinish={handleSubmit}>
            <Form.Item style={{ marginBottom: "0", width: '90%' }} name='msg'>
                <Input style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    paddingLeft: "20px",
                    fontSize: "20px",
                }} type="text"
                    placeholder="Nhập tin nhắn bạn muốn gửi...." />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }}>
                <Button style={{ border: '0' }} htmlType="submit" icon={<SendOutlined style={{ fontSize: '30px' }} />} />
            </Form.Item>
        </Form>
    )
}