import React from 'react'
import { Card, Button, Table, Modal, message } from 'antd';
import { PAGE_SIZE } from '../../utils/consts'
import { reqGetRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateutils'
//商品分类
class Role extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            role: {},//选中的role,
            isShowAdd: false,
            isShowAuth: false
        }
        this.AuthForm = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            { title: '角色名称', dataIndex: 'name' },
            { title: '创建时间', dataIndex: 'create_time', render: (create_time) => formateDate(create_time) },
            { title: '授权时间', dataIndex: 'auth_time', render: (auth_time) => formateDate(auth_time) },
            { title: '授权人', dataIndex: 'auth_name' },
        ]
    }

    getRoles = async () => {
        const res = await reqGetRoles()
        console.log(res);
        if (res.status === 0) {
            const roles = res.data
            this.setState({ roles })
        } else {

        }
    }
    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role);
                this.setState({ role })
            }
        }
    }
    handleAddRole = () => {
        this.form.validateFields()
            .then(async values => {
                this.setState({ isShowAdd: false })
                const { roleName } = values
                // console.log(roleName);
                this.form.resetFields()
                const res = await reqAddRole(roleName)
                // console.log(res);
                if (res.status === 0) {
                    message.success('添加角色成功')
                    // this.getRoles()
                    const role = res.data
                    // const roles = [...this.state.roles]
                    // roles.push(role)
                    // this.setState({ roles })
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))
                }
            })
            .catch(errorInfo => {
                message.error('errorInfo')
                console.log(errorInfo);
            })

    }
    setForm = (form) => this.form = form
    updateRole = async () => {
        // console.dir(this.AuthForm);
        this.setState({ isShowAuth: false })
        const role = this.state.role
        const menus = this.AuthForm.current.getMenus()
        console.log(menus);
        role.menus = menus
        role.auth_name = memoryUtils.user.username
        const res = await reqUpdateRole(role)
        if (res.status === 0) {
            message.success('设置角色权限成功')
            this.setState(state => ({
                roles: [...state.roles]
            }))
        } else {
            message.error('设置角色权限失败')
        }
    }

    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role, isShowAdd, isShowAuth } = this.state
        const title = <span>
            <Button type='primary' style={{ marginRight: 10 }} onClick={() => this.setState({ isShowAdd: true })}>添加角色</Button>
            <Button type='primary' disabled={!role._id}
                onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
        </span>
        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    bordered
                    columns={this.columns}
                    dataSource={roles}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {
                            this.setState({ role })
                        }
                    }}

                    onRow={this.onRow}
                />
                <Modal title="添加角色"
                    visible={isShowAdd}
                    onOk={this.handleAddRole}
                    onCancel={() => {
                        this.form.current.resetFields()
                        this.setState({ isShowAdd: false })
                    }}
                    okText='确定'
                    cancelText='取消'
                >
                    <AddForm setForm={this.setForm} />
                </Modal>
                <Modal title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                    }}
                    okText='确定'
                    cancelText='取消'
                >
                    <AuthForm ref={this.AuthForm} role={role} />
                </Modal>
            </Card >
        )
    }
}
export default Role
