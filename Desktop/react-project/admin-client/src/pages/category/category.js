import React from 'react'
import { Card, Button, Table, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './AddForm'
import EditForm from './EditForm'
//商品分类
class Category extends React.Component {
    state = {
        categorys: [],
        loading: false,
        subCategoys: [],
        parentId: "0",
        parentName: '',
        showModal: 0, //0 隐藏 1添加 2 修改,
    }
    //初始化Table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                render: (category) => {
                    return (
                        <>
                            <Button type="link" onClick={() => this.showEdit(category)} >修改分类</Button>
                            {this.state.parentId === '0'
                                ?
                                <Button type="link" onClick={() => this.showSubCategoys(category)}>
                                    查看子分类
                                </Button>
                                : null}
                        </>
                    )
                },
                key: 'age',
            },
        ]
    }
    //显示修改对话框
    showEdit = (category) => {
        this.category = category
        // console.log(category);
        this.setState({ showModal: 2 })
    }
    //显示添加对话框
    showAdd = () => {
        this.setState({ showModal: 1 })
    }
    //提交添加分类
    handleAdd = async () => {
        this.setState({ showModal: 0 })
        const { categoryName, parentId } = this.form.getFieldValue()
        this.form.resetFields()
        const res = await reqAddCategory(categoryName, parentId)
        console.log(res);
        if (res.status === 0) {
            if (parentId === this.state.parentId) {
                this.getCategorys()
            }
            else if (parentId === '0') {
                this.getCategorys('0')
            }
        }
    }

    //提交修改分类
    handleEdit = async () => {
        this.setState({ showModal: 0 })
        const categoryId = this.category._id
        const categoryName = this.form.getFieldValue().name
        // console.log(typeof (categoryName));
        // const { categoryName } = values
        this.form.resetFields()
        // console.log(categoryName);
        const res = await reqUpdateCategory({ categoryId, categoryName })
        if (res.status === 0) {
            this.getCategorys()
        }


    }
    //隐藏对话框
    handleCancel = () => {
        this.setState({ showModal: 0 })
    }
    //显示二级分类列表
    showSubCategoys = (category) => {
        this.setState(
            {
                parentId: category._id,
                parentName: category.name
            },
            () => {
                this.getCategorys()
            })
        //获取二级分类列表

    }
    //显示一级列表
    showCategoys = () => {
        this.setState({
            loading: false,
            subCategoys: [],
            parentId: "0",
            parentName: ''
        })
    }
    //异步获取分类列表显示
    getCategorys = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
        //获取一级分类列表
        const res = await reqCategorys(parentId)
        // console.log(res);
        this.setState({ loading: false })
        if (res.status === 0) {
            const categorys = res.data
            if (parentId === '0') {
                this.setState({ categorys })
            } else {
                this.setState({ subCategoys: categorys })
            }
        } else {
            console.log('获取分类列表失败');
        }
    }
    setForm = (form) => { this.form = form }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        //获取一级分类列表
        this.getCategorys()
    }

    render() {
        const category = this.category || {}
        const extra = <Button type='primary' icon={<PlusOutlined />} onClick={this.showAdd}> 添加</Button>
        const { categorys, subCategoys, parentId, parentName, loading } = this.state
        const title = parentId === '0' ? '一级分类列表' : (<span><Button type='link' onClick={this.showCategoys}>一级分类列表</Button><span style={{ marginRight: 15 }}>\</span>{parentName}</span>)
        return (
            <Card title={title} extra={extra} >
                <Table
                    dataSource={parentId === '0' ? categorys : subCategoys}
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={loading} />
                <Modal title="添加分类"
                    visible={this.state.showModal === 1}
                    onOk={this.handleAdd}
                    onCancel={this.handleCancel}
                    okText='确定'
                    cancelText='取消'
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form) => { this.form = form }} />
                </Modal>
                <Modal title="修改分类"
                    visible={this.state.showModal === 2}
                    onOk={this.handleEdit}
                    onCancel={this.handleCancel}
                    okText='确定'
                    cancelText='取消'>
                    <EditForm
                        categoryName={category.name}
                        setForm={this.setForm}
                    />
                </Modal>
            </Card>
        )
    }
}
export default Category;