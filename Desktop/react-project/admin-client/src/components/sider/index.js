import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
const { SubMenu } = Menu;
class Side extends React.Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    //根据menu的数据数组生成对应的标签数组
    // getMenuNodes = (menuList) => {
    //     return menuList.map(v => {
    //         // title icon key children

    //         if (!v.children) {
    //             return (
    //                 <Menu.Item key={v.key} >
    //                     <Link to={v.key}>{v.title}</Link>
    //                 </ Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu key={v.key} title={v.title} >
    //                     {this.getMenuNodes(v.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }
    //判断当前登录用户拥有的权限
    hasAuth = (item) => {
        //如果当前用户是admin直接通过
        //如果当前item是公开的
        const { key, isPublic } = item
        const menus = memoryUtils.user.role.menus
        // console.log('1',key);
        // console.log('====================================');
        // console.log('2',menus);
        // console.log('====================================');
        // console.log('3', menus.indexOf(key) !== -1);
        // console.log('====================================');
        const username = memoryUtils.user.username
        // console.log('isPublic', isPublic);
        // console.log('username', username === 'admin');
        // console.log(username);
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        }
        else if (item.children) {
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        else {
            return false
        }
    }
    getMenuNodes = (menuList) => {
        const pathname = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            //向pre中添加 Menu.Item  或者 SubMenu
            // console.log(this.hasAuth(item))
            if (this.hasAuth(item)) {
                if (!item.children) {
                    pre.push((<Menu.Item key={item.key}  >
                        <Link to={item.key}>{item.title}</Link>
                    </ Menu.Item>))
                } else {
                    const cItem = item.children.find(cItem => pathname.indexOf(cItem.key) === 0)
                    if (cItem) {
                        this.openKey = item.key
                    }
                    pre.push((<SubMenu key={item.key} title={item.title} >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>))
                }
            }
            return pre
        }, [])
    }
    componentWillMount() {
        this.MenuNodes = this.getMenuNodes(menuList)

    }
    render() {
        let pathname = this.props.location.pathname
        if (pathname.indexOf('/product') === 0) {
            pathname = '/product'
        }
        const cItem = this.openKey
        return (
            //得当当前的路由路径
            <div>
                <Link
                    to='/'
                    className='sider_bar'>
                    <h1>后台管理系统</h1>
                </Link>
                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[cItem]}
                    mode="inline"
                    theme="dark"
                    collapsed={this.state.collapsed ? "value" : "false"}
                >
                    {this.MenuNodes}
                    {/* <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<ShopOutlined />} title=" 商品 ">
                        <Menu.Item key="/category">{<UnorderedListOutlined />}<Link to='/category'>品类管理</Link></Menu.Item>
                        <Menu.Item key="/product">{<ToolOutlined />}<Link to='/product'>商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/role" icon={<UserOutlined />}>
                        <Link to='/role'>用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/user" icon={<SafetyOutlined />}>
                        <Link to='/user' >角色管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AreaChartOutlined />} title=" 图形图表 ">
                        <Menu.Item key="/charts/bar">{<BarChartOutlined />}<Link to='/charts/bar' >柱状图</Link></Menu.Item>
                        <Menu.Item key="/charts/line">{<LineChartOutlined />}<Link to='/charts/line'>折线图</Link></Menu.Item>
                        <Menu.Item key="/charts/pie">{<PieChartOutlined />}<Link to='/charts/pie' >饼图</Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}

//包装非路由组件 返回一个新的组件 新的组件向非路由组件传递 history location match 
export default withRouter(Side)