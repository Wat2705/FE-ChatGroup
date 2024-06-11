import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";

export default function Register() {
    const [api, contextHolder] = notification.useNotification();
    const nav = useNavigate()

    const handleSubmit = async (value) => {
        let { rePassword, ...rest } = value
        try {
            await axios.post('/register', rest)
            nav('/login')
        } catch (error) {
            api.error({
                message: error.response.data.message,
                description: 'Email của bạn đã được đăng ký!',
                duration: 2
            });
        }
    }

    return (
        <>
            <div className={styles.jsxRightAuthentication}>
                <span className={styles.jaxSd}>
                    Đã có tải khoản?{" "}
                    <Link
                        to="/login"
                    >
                        Đăng nhập!
                    </Link>
                </span>

                <div className={styles.rowJax}>
                    <div
                        className={styles.chukJaxAuth}
                    >
                        <div className={styles.titleAuthentication}
                        >
                            <h1>Đăng ký</h1>
                            <p>Nhập thông tin của bạn phía dưới</p>
                        </div>
                        <Form onFinish={handleSubmit} layout="vertical" >
                            <Form.Item name={'name'} label={'Name'} rules={[
                                {
                                    required: true,
                                    message: 'Tên trống!'
                                },
                            ]}>
                                <Input
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập tên của bạn" />
                            </Form.Item>
                            <Form.Item name={'email'} label={'Email'} rules={[
                                {
                                    required: true,
                                    message: 'Email trống!'
                                },
                                {
                                    type: 'email',
                                    message: 'Sai định dạng email!'
                                }
                            ]}>
                                <Input
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập email của bạn eg: abc@gmail.com" />
                            </Form.Item>
                            <Form.Item name={'password'} label={'Mật khẩu'} rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu trống!'
                                },
                                {
                                    min: 6,
                                    message: 'Tối thiểu 6 ký tự!'
                                },
                            ]}>
                                <Input.Password
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập password của bạn eg: matkhaucauban"
                                />
                            </Form.Item>
                            <Form.Item name='rePassword' label='Nhập lại mật khẩu' rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!'
                                },
                                {
                                    min: 6,
                                    message: 'Tối thiểu 6 ký tự!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Nhập lại mật khẩu phải trùng khớp'));
                                    },
                                })
                            ]}>
                                <Input.Password
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập lại password của bạn"
                                />
                            </Form.Item>
                            <Form.Item name='phone' label='Nhập số điện thoại' rules={[
                                {
                                    required: true,
                                    message: 'Số điện thoại trống!'
                                },
                                {
                                    max: 9,
                                    message: 'Tối đa 9 ký tự!'
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value || Number(value) == value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Ký tự nhập vào phải là số!'));
                                    },
                                })
                            ]}>
                                <Input
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: '100%' }} htmlType="submit" type="primary" size="large">Đăng ký</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>

    )
}