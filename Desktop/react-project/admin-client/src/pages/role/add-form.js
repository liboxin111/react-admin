import React from 'react'
import { Form, Input } from 'antd';
const Item = Form.Item
const AddForm = (props) => {
    const [AddForm] = Form.useForm()
    props.setForm(AddForm)
    return (
        <Form
            form={AddForm}
        >
            <Item
                label="角色名称"
                name='roleName'
                rules={[
                    {
                        required: true,
                        message: '请输入角色名称!',
                    },
                ]}>
                <Input placeholder='请输入角色名称' type='text'></Input>
            </Item>
        </Form>
    );
};
export default AddForm;
