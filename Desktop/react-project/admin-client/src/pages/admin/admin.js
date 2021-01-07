//admin  路由组件
import React from 'react'
import Side from '../../components/sider/index'
import Header from '../../components/header/index'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;

class Admin extends React.Component {

    render() {
        const user = memoryUtils.user
        console.log("admin", user);
        if (!user._id || !user) {
            return <Redirect to='/login' />
        } else {
            return (
                <Layout style={{ minHeight: "100%" }}>
                    <Sider>
                        <Side />
                    </Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{ margin: '20px' }}>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category} />
                                <Route path='/product' component={Product} />
                                <Route path='/role' component={Role} />
                                <Route path='/user' component={User} />
                                <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer
                            style={{ textAlign: 'center', color: '#ccc' }}
                        >Footer
                        </Footer>
                    </Layout>
                </Layout>)
        }

    }
}
export default Admin;
