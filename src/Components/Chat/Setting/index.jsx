import { socket } from "@/config/socket";
import { toggleSetting } from "@/redux/toggle";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Upload } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./setting.module.scss";
const { VITE_BASE_URL } = import.meta.env

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export default function Setting() {
    const isSettingOpen = useSelector((state) => state.toggle.isSettingOpen);
    const userList = useSelector(state => state.chat.userList)
    const [edit, setIsEdit] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [originFile, setOriginFile] = useState(null);

    const dispatch = useDispatch();
    const nav = useNavigate()

    let editUser = '';

    if (isSettingOpen) {
        const beforeUpload = (file) => {
            getBase64(file, (url) => {
                setImageUrl(url);
                setOriginFile(file);
            });
            return false;
        };

        userList.filter(e => {
            if (e.user._id == jwtDecode(localStorage.getItem('token')).id) {
                editUser = e.user
                if (imageUrl == null) {
                    setImageUrl(`${VITE_BASE_URL}/${e.user.avatarId.path}`)
                }
            }
        });

        const handleSubmit = () => {
            let formData = new FormData();
            if (originFile != null && imageUrl != '') {
                formData.append('avatar', originFile);
            }
            if (document.querySelector('#name').value != '') {
                formData.append('name', document.querySelector('#name').value);
            }
            axios.post('/avatar', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                }
            }).then(() => {
                setIsEdit(false);
                socket.emit('refreshUser', {
                    id: jwtDecode(localStorage.getItem('token')).id,
                    path: imageUrl == undefined ? '' : imageUrl
                });
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
            <Drawer id="drawer" title='Account Info' open={isSettingOpen} onClose={() => dispatch(toggleSetting())}>
                <div className={`${styles.wp} ${isSettingOpen ? "active" : "disable"}`}>
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
                                    <p>Name: {editUser.name}</p>
                                    <p>Email: {editUser.email}</p>
                                </div>
                                <div className="d-flex justify-content-center gap-4">
                                    <Button onClick={() => setIsEdit(true)}>Sửa</Button>
                                    <Button htmlType="button" onClick={async () => {
                                        await axios.post('/logout', { token: localStorage.getItem('token') })
                                        localStorage.clear()
                                        nav('/login')
                                    }}>Đăng xuất</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.content}>
                            <Flex gap="middle" wrap justify="center" align="center">
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
                                {imageUrl == '' ? '' : <Button onClick={() => {
                                    setImageUrl('')
                                    setOriginFile(null)
                                }}>Remove</Button>}
                            </Flex>
                            <div className="row mt-4">
                                <div className="mb-3">
                                    <label className="form-label">
                                        <strong>Name</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={editUser == '' ? 'Nhập tên mới' : editUser.name}
                                        id="name"
                                    />
                                </div>
                                <div className="d-flex justify-content-center gap-4 ">
                                    <Button onClick={handleSubmit}>Update</Button>
                                    <Button onClick={() => setIsEdit(false)}>Exit</Button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div >
            </Drawer>
        );
    }
}