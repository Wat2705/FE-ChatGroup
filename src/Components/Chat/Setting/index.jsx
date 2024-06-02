import { toggleSetting } from "@/redux/toggle";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./setting.module.scss";

export default function Setting() {
    const isSettingOpen = useSelector((state) => state.toggle.isSettingOpen);
    const [edit, setIsEdit] = useState(false);
    const refInput = useRef(null);

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)

    if (isSettingOpen) {
        const handleClickChangeThumbnail = () => {
            const inputElement = refInput.current;

            if (inputElement) {
                inputElement.click();
            }
        }

        const handleSubmit = () => {
            console.log(document.querySelector('#avatar').files[0])
        }

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
                        <div
                            className={`${styles.introduce} ${styles.customizeEdit}`}
                            onClick={handleClickChangeThumbnail}
                        >
                            <img
                                className={`${styles.thumbnail} ${styles.edit}`}
                                src="https://images.pexels.com/photos/3654869/pexels-photo-3654869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                alt=""
                            />
                            <span>Thay Hình Ảnh</span>
                            <div className={styles.overlay}></div>
                            <input ref={refInput} type="file" id="avatar" hidden />
                        </div>
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