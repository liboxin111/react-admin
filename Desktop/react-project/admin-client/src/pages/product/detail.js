//商品详情页
import React from 'react'
import { Button, Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IMG_URL } from '../../utils/consts'
import { reqCategorys, reqCategory } from '../../api'
const Item = List.Item
class ProductDetail extends React.Component {
    state = { cName1: '', cName2: '' }
    async componentDidMount() {
        let res
        const { pCategoryId, categoryId } = this.props.location.state.product
        console.log(typeof (pCategoryId));
        console.log(categoryId);
        if (pCategoryId === '0') {
            //一级分类下的
            res = await reqCategorys(pCategoryId)
            console.log(res)
            if (res.status === 0) {
                const cName1 = res.data.name
                this.setState({ cName1 })
            }

        } else {
            //二级
            // res = await reqCategory(pCategoryId)
            // const res1 = await reqCategory(categoryId)
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            if (results[0].status === 0 && results[1].status === 0) {
                const cName1 = results[0].data.name
                const cName2 = results[1].data.name
                console.log(cName1, cName2);
                this.setState({ cName1, cName2 })
            }
        }
    }
    render() {
        console.log(this.props.location.state.product);
        const { name, desc, price, detail, imgs } = this.props.location.state.product
        const { cName1, cName2 } = this.state
        const title = (
            <>
                <Button type='link'
                    onClick={() => this.props.history.push('/product')}
                    icon={<ArrowLeftOutlined style={{ fontSize: 20 }} />} />
            商品详情
            </>
        )
        return (
            <Card title={title} className='product_detail'>
                <List >
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格:</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类:</span>
                        <span>{cName1}{cName2 ? '-->' + cName2 : null}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片:</span>
                        <span>
                            {imgs.map(img =>
                                <img key={img} src={IMG_URL + img} />)}
                        </span>
                    </Item>
                    <Item >
                        <span className='left'>商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
export default ProductDetail