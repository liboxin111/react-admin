import React from 'react'
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig'
const Item = Form.Item
class AuthForm extends React.Component {
    constructor(props) {
        super(props)
        const menus = this.props.role.menus
        this.state = {
            treeData: [
            ],
            checkedKeys: menus
        }
        this.formRef = React.createRef();
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        this.setState({ checkedKeys })
        console.log('onCheck', checkedKeys, info);
    }
    getMenus = () => this.state.checkedKeys
    getTreeDate = (menuList) => {
        menuList.reduce((pre, item) => {
            console.log(item);
            pre.push(
                {
                    title: item.title,
                    key: item.key,
                    children: item.children ? this.getTreeDate(item.children) : null
                })
            return pre
        }, [])
        // console.log(menuList);
        this.setState({ treeData: [{ title: '平台权限', key: "/all" }, ...menuList] })
    }
    //根据新传入的role来更新checkKeys
    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus

        this.setState({ checkedKeys: menus })
    }
    componentWillMount() {
        this.getTreeDate(menuList)
    }
    render() {
        const roleName = this.props.role.name
        return (
            <div>
                <Item label="角色名称" >
                    <Input value={roleName} disabled></Input>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    treeData={this.state.treeData}
                />
            </div>
        )
    }
}
export default AuthForm

