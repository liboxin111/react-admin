// login 路由组件
import React from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd'
import favicon from './images/favicon.ico'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storgeUtils from '../../utils/storgeUtils'
import { Redirect } from 'react-router-dom'
class Login extends React.Component {
    onFinish = async (values) => {
        const { username, password } = values
        const res = await reqLogin(username, password)
        if (res.status === 0) {
            message.success('登录成功')
            const user = res.data
            memoryUtils.user = user //保存在内存中
            storgeUtils.saveUser(user)//保存到localStorge
            this.props.history.replace('/')
        } else {
            message.error(res.msg)
        }
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // 自定义验证
    validator = (rule, value, callback) => {
        if (!value) {
            return Promise.reject("请输入内容!");
            // callback('请输入用户名!')
        } else if (value.length < 4) {
            return Promise.reject("输入内容的长度最少为4!");
            // callback('用户名的长度最少为4!')
        } else if (!value.length > 12) {
            return Promise.reject("输入内容的长度最多为12");
            // callback('用户名的长度最多为12')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject("输入内容必须是英文,数字或下划线组成");
            // callback('用户名必须是英文,数字或下划线组成')
        } else {
            return Promise.resolve();
        }
    }
    render() {
        //如果用户已经登录 自动跳转到admin界面
        const user = memoryUtils.user
        if (user._id) {
            return <Redirect to='/' />
        } else {
            return (
                <div className='login'>
                    <header className='login-header'>
                        <img src={favicon} alt='logo'></img>
                        <h1>React项目:后台管理系统</h1>
                    </header>
                    <section className='login-content'>
                        <h2>用户登录</h2>
                        <Form
                            className='login-form'
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                name="username"
                                value="admin"
                                rules={
                                    [
                                        { validator: this.validator },
                                    ]
                                }
                            >
                                <Input
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                    placeholder='username'
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                value="admin"
                                rules={[{ validator: this.validator }]}
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
}
export default Login
