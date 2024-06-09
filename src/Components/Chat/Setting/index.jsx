import { toggleSetting } from "@/redux/toggle";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Upload } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./setting.module.scss";
import { socket } from "@/config/socket";


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export default function Setting() {
    const isSettingOpen = useSelector((state) => state.toggle.isSettingOpen);
    const [edit, setIsEdit] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [originFile, setOriginFile] = useState(null)

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)

    if (isSettingOpen) {
        const beforeUpload = (file) => {
            getBase64(file, (url) => {
                setImageUrl(url);
                setOriginFile(file)
            });
            return false;
        };

        const handleSubmit = () => {
            let formData = new FormData();
            formData.append('avatar', originFile)
            if (document.querySelector('#name').value != '') {
                formData.append('name', document.querySelector('#name').value)
            }
            axios.post('http://localhost:8080/avatar', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                }
            }).then(res => {
                setIsEdit(false)
                socket.emit('refreshUser')
            })
        }

        const uploadButton = (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Set Avatar
                </div>
            </button>
        );

        return (
            <div className={`${styles.wp} ${isSettingOpen ? "active" : "disable"}`}>
                <div className={`${styles.headerInfo} d-flex py-2 gap-2 justify-content-between align-items-center`}>
                    <button className="btn" onClick={() => dispatch(toggleSetting())}>
                        <i className="bi bi-x"></i>
                    </button>
                    <h4>Account Info</h4>
                    <button
                        className="btn"
                        onClick={() => {
                            setIsEdit(!edit);
                        }}
                    >
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                </div>
                {!edit ? (
                    <div className={styles.oneStep}>
                        <div className={styles.introduce}>
                            <img
                                className={styles.thumbnail}
                                src="https://images.pexels.com/photos/3654869/pexels-photo-3654869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                alt=""
                            />
                            <h5>Avatar</h5>
                            <div className="px-2 py-4">
                                <h4>User Info</h4>
                                <p>Name: {decode.name}</p>
                                <p>Email: {decode.email}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <Flex gap="middle" wrap justify="center">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Flex>
                        <div className="row mt-4">
                            <div className="mb-3">
                                <label className="form-label">
                                    <strong>Name</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên mới"
                                    id="name"
                                />
                            </div>
                            <Button onClick={handleSubmit}>Update</Button>
                        </div>
                    </div>
                )
                }
            </div >
        );
    }
}