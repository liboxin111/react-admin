//login 路由组件
import React from 'react'
import './login.less'
import { Form, Input, Button, } from 'antd';
import favicon from './images/favicon.ico'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = (e) => {

    }
    render() {

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={favicon}></img>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <Form
                        className='login-form'
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                style={{ color: 'rgba(0,0,0,.25)' }}
                                placeholder='username'
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                style={{ color: 'rgba(0,0,0,.25)' }}
                                prefix={<LockOutlined />}
                                placeholder='password' />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className='login-form-button'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login;
