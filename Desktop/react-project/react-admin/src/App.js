//应用根组件
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import 'antd/dist/antd.less'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}>Admin Page</Route>
        </Switch>
      </Router>
    )
  }
}
export default App;
