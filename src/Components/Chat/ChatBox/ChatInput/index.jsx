import { socket } from "@/config/socket";
import { sendingMessage } from "@/redux/chat";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import styles from "../chatbox.module.scss";

export default function ChatInput() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

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
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;
                const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
                const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
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
                let time = dayjs(new Date()).format('hh:mm')
                getBase64(info.file.originFileObj, (url) => {
                    resizeBase64Image(url, info.file.type).then(img => {
                        dispatch(sendingMessage({
                            msg: img,
                            user: 'Tôi',
                            time
                        }))
                        socket.emit('sendMessagePublic', {
                            msg: img,
                            time
                        })
                    })

                });
            }
        }
    }

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