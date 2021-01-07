import React from 'react'
import { Button, Card, Table, message, Modal } from 'antd'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import { PAGE_SIZE } from '../../utils/consts'
import { formateDate } from '../../utils/dateutils'
import UserForm from './user-form'
const { confirm } = Modal;
class User extends React.Component {
    state = {
        users: [],
        isShow: false,
        roles: []
    }
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => {
                    return (
                        <div>
                            <Button type="link" onClick={() => this.showEdit(user)}>修改</Button>
                            <Button type="link" onClick={() => this.removeUser(user)}>删除</Button>
                        </div>
                    )
                },
            },
        ];
    }

    //生成{key:value}  {role_id:name}
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        this.roleNames = roleNames
    }
    removeUser = (user) => {
        console.log(user);
        const { _id, username } = user
        console.log(this);
        const _this = this
        confirm({
            title: `确认删除${username}吗`,
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                const res = await reqDeleteUser(_id)
                console.log(res);
                if (res.status === 0) {
                    message.success('删除用户成功!')
                    _this.getUsers()
                }
            },
        })
    }
    showAdd = () => {
        this.user = null
        this.setState({ isShow: true })
    }
    showEdit = (user) => {
        console.log(user);
        this.user = user
        this.setState({ isShow: true })
    }
    getUsers = async () => {
        const res = await reqUsers()
        console.log(res);
        if (res.status === 0) {
            const { users, roles } = res.data
            this.initRoleNames(roles)
            this.setState({ users, roles })
        }
    }
    addOrUpdateUser = () => {
        this.form.validateFields()
            .then(async values => {
                this.setState({ isShow: false })
                console.log(values);
                const user = this.form.getFieldValue()
                this.form.resetFields()
                if (this.user) {
                    user._id = this.user._id
                }
                const res = await reqAddOrUpdateUser(user)
                if (res.status === 0) {
                    message.success(`${this.user ? '修改' : '添加'}用户成功!`)
                    this.getUsers()
                }

            }).catch(errorInfo => {
                message.error(errorInfo)
            })
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        const { users, isShow, roles } = this.state
        const user = this.user || {}
        const title = (
            <span>
                <Button type='primary' onClick={() => this.showAdd()}> 添加用户</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    dataSource={users}
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    pagination={
                        {
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                        }
                    }
                />
                <Modal
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        this.setState({ isShow: false })
                    }}
                    okText='确定'
                    cancelText='取消'
                >
                    <UserForm user={user} roles={roles} setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        )
    }
}
export default User