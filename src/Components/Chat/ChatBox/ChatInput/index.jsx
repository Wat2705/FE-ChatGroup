import { socket } from "@/config/socket";
import { sendingMessage } from "@/redux/chat";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../chatbox.module.scss";

export default function ChatInput() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.id)

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const resizeBase64Image = (base64Image, type) => {
        return new Promise((resolve, reject) => {
            const maxSizeInMB = 1;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            const img = new Image();
            img.src = base64Image;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 200;
                ctx.drawImage(img, 0, 0, 200, 200);
                let quality = 0.8;
                let dataURL = canvas.toDataURL(type, quality);
                resolve(dataURL);
            };
        });
    }

    const props = {
        name: 'image',
        action: 'http://localhost:8080/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status == 'done') {
                getBase64(info.file.originFileObj, (url) => {
                    resizeBase64Image(url, info.file.type).then(img => {
                        dispatch(sendingMessage({
                            imageId: {
                                base64: img
                            },
                            id: userId
                        }))
                        socket.emit('sendMessagePublic', {
                            base64: img,
                            id: userId,
                        })
                        axios.post(`http://localhost:8080/message/send`, {
                            imageId: info.file.response.id,
                            senderId: userId
                        }).then(res => console.log(res))
                    })
                });
            }
        }
    }

    const handleSubmit = async (data) => {
        if (data.msg != '' && data.msg != undefined) {
            dispatch(sendingMessage({
                content: data.msg,
                id: userId,
            }));
            socket.emit('sendMessagePublic', {
                content: data.msg,
                id: userId,
            });
            form.setFieldValue('msg', '');
            await axios.post(`http://localhost:8080/message/send`, {
                content: data.msg,
                senderId: userId
            });
        }
    }

    return (
        <Form className={styles.inputChat} form={form} onFinish={handleSubmit} >
            <Form.Item style={{ marginBottom: "0", width: '90%' }} name='msg'>
                <Input style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    paddingLeft: "20px",
                    fontSize: "20px",
                }}
                    type="text"
                    placeholder="Nhập tin nhắn bạn muốn gửi...." />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0', marginRight: '10px' }}>
                <Upload showUploadList={false} maxCount={1} {...props}>
                    <Button style={{ border: '0' }} icon={<UploadOutlined style={{ fontSize: '30px' }} />}></Button>
                </Upload>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }}>
                <Button style={{ border: '0' }} htmlType="submit" icon={<SendOutlined style={{ fontSize: '30px' }} />} />
            </Form.Item>
        </Form >
    )
}