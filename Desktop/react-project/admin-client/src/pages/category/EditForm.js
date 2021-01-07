// import React from 'react';
// import { Form, Input } from 'antd';
// const Item = Form.Item
// class UpdateForm extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     formRef = React.createRef();
//     componentDidMount() {
//         console.log('componentDidMount', this.formRef.current)
//         this.props.setForm(this.formRef)
//         this.formRef.current.setFieldsValue({
//             input: this.props.categoryName
//         })
//     }

//     render() {

//         return (
//             <Form
//                 ref={this.formRef}
//                 initialValues={this.props.categoryName}
//             >
//                 <Item name='input' label='分类名称'
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入分类名称!',
//                         },
//                     ]}>
//                     <Input placeholder='请输入分类名称' />
//                 </Item>
//             </Form>
//         )
//     }
// }
// export default UpdateForm;
import React from 'react';
import { Form, Input } from 'antd';
const Item = Form.Item
function UpdateForm(props) {
    const [form] = Form.useForm();
    console.log(form);
    props.setForm(form)
    console.log(props);
    form.setFieldsValue({
        name: props.categoryName
    })

    return (
        <Form
            name="basic"
            form={form}
            initialValues={props.categoryName}
        >
            <Item name="name" label='分类名称'
                rules={[
                    {
                        required: true,
                        message: '请输入分类名称!',
                    },
                ]}>
                <Input placeholder='请输入分类名称' />
            </Item>
        </Form>
    )

}

export default UpdateForm;