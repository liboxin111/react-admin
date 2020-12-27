//admin  路由组件
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
class Admin extends React.Component {
    render() {
        return (
            <Router>
                <Route path='/'></Route>
            </Router>
        )
    }
}
export default Admin;
