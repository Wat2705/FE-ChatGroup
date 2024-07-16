import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";

export default function Register() {
    const nav = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (value) => {
        let { rePassword, ...rest } = value
        try {
            await axios.post('/register', rest)
            messageApi.open({
                type: 'success',
                content: 'Đăng ký thành công!'
            })
            setTimeout(() => {
                nav('/login')
            }, 500)
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error.response.data.message
            })
        }
    }

    return (
        <>
            {contextHolder}
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
                                    autoComplete="on"

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
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Form.Item name='phone' label='Nhập số điện thoại' rules={[
                                {
                                    required: true,
                                    message: 'Số điện thoại trống!'
                                },
                                {
                                    min: 9,
                                    message: 'Tối thiểu 9 ký tự!'
                                },
                                {
                                    max: 11,
                                    message: 'Tối đa 11 ký tự!'
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