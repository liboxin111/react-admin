import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddProductUpdate from './add-update'
import ProductDetail from './detail'
import ProductHome from './productHome'
import './product.less'
//商品
class Product extends React.Component {
    render() {

        return (

            <Switch>
                <Route exact path='/product' component={ProductHome}></Route>
                <Route exact path='/product/addupdate' component={AddProductUpdate}></Route>
                <Route exact path='/product/detail' component={ProductDetail}></Route>
                <Redirect form='/product/*' to='/product'></Redirect>
            </Switch>

        )
    }
}
export default Product