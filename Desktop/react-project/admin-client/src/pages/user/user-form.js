import React from 'react'
import { Form, Input, Select } from 'antd';
const Item = Form.Item
const Option = Select.Option
const UserForm = (props) => {
    const [UserForm] = Form.useForm()
    const { roles } = props
    const user = props.user || {}
    props.setForm(UserForm)
    UserForm.setFieldsValue({
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id
    })
    const formItemLayout =
    {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 17,
        },
    }

    // console.log(user);
    return (
        <Form
            form={UserForm}
            {...formItemLayout}
            initialValues
        >
            <Item
                label="用户名"
                name='username'
                rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                ]}>
                <Input placeholder='请输入用户名' type='text'></Input>
            </Item>
            <Item
                label="密码"
                name='password'
                rules={[
                    {
                        required: true,
                        message: '请输入角色密码!',
                    },
                ]}>
                <Input placeholder='请输入密码' type='password'></Input>
            </Item>
            <Item
                label="手机号"
                name='phone'
                rules={[
                    {
                        required: true,
                        message: '请输入手机号!',
                    },
                ]}>
                <Input placeholder='请输入手机号' type='text'></Input>
            </Item>
            <Item
                label="邮箱"
                name='email'
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱!',
                    },
                ]}>
                <Input placeholder='请输入邮箱' type='email'></Input>
            </Item>
            <Item
                label="角色"
                name='role_id'
                rules={[
                    {
                        required: true,
                        message: '请选择角色!',
                    },
                ]}>
                <Select >
                    {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
                </Select>
            </Item>
        </Form>
    );
};
export default UserForm;