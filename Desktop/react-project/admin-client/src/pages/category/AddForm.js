import React from 'react'
import { Form, Select, Input } from 'antd';
const Item = Form.Item
const Option = Select.Option
const AddForm = (props) => {
    const [AddForm] = Form.useForm()
    const { parentId, categorys } = props
    props.setForm(AddForm)
    AddForm.setFieldsValue({ parentId, categorys })
    return (
        <Form
            form={AddForm}
            initialValues={{ parentId }}
        >
            <Item label="分类" name='parentId'>
                <Select >
                    <Option value='0'> 一级分类</Option>
                    {
                        categorys.map(c => <Option value={c._id} key={c._id}> {c.name}</Option>)
                    }
                </Select>
            </Item>
            <Item
                label="分类名称"
                name='categoryName'
                rules={[
                    {
                        required: true,
                        message: '请输入分类名称!',
                    },
                ]}>
                <Input placeholder='请输入分类名称' type='text'></Input>
            </Item>
        </Form>
    );
};
export default AddForm;
