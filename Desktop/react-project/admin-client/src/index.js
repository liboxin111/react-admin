import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import memoryUtils from './utils/memoryUtils'
import storgeUtils from './utils/storgeUtils'
//读取Local中读取user,保存在内存中
const user = storgeUtils.getUser()
memoryUtils.user = user
ReactDOM.render(<App />, document.getElementById('root'));

