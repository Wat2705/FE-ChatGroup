import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styles from "../chatbox.module.scss";

export default function ChatInput() {
    return (
        <Form className={styles.inputChat}>
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