import React from 'react'
import { withRouter } from 'react-router-dom'
import storgeUtils from '../../utils/storgeUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import { Button } from 'antd';

class Heade extends React.Component {
    logout = () => {
        Modal.confirm({
            content: '确定退出登录?',
            onOk: () => {
                storgeUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    getTitel = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cIem => cIem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    render() {
        const title = this.getTitel()
        return (
            <div className='header'>
                <div className='header-left'>{title}</div>
                <div className='header-rigth'>
                    <span>欢迎</span> <span>{storgeUtils.getUser().username}</span> <Button className='btn' type="link" onClick={this.logout}>退出</Button>
                </div>
            </div>
        )
    }
}
export default withRouter(Heade)
