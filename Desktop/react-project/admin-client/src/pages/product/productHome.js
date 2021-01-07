import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Card, Table, Select, message } from 'antd'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/consts'
const Option = Select.Option
class ProductHome extends React.Component {
    state = {
        products: [],
        total: 0,
        loading: false,
        searchName: "",
        searchType: "productName",
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                wideth: 200
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    const { _id, status } = product
                    const newStatus = status === 1 ? 2 : 1
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                type='primary'
                                onClick={() => this.upDataStatus(_id, newStatus)}>
                                {status === 1 ? '上架' : '下架'}
                            </Button>
                            {status === 2 ? '在售' : '已下架'}
                        </div>
                    )
                }
            },
            {
                width: 155,
                title: '操作',
                render: (product) => {
                    return (
                        <div>
                            <Button type="link" onClick={() => this.props.history.push('/product/detail', { product })}>详情</Button>
                            <Button type="link" onClick={() => this.props.history.push('/product/addupdate', product)}>修改</Button>
                        </div>
                    )
                },
            },
        ];
    }
    //更新指定商品状态
    upDataStatus = async (productId, status) => {
        console.log(status);
        const res = await reqUpdateStatus(productId, status)
        console.log(res);
        if (res.status === 0) {
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        this.setState({ loading: true })
        let res
        if (searchName) {
            res = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
            // console.log('search', res);
        } else {
            res = await reqProducts(pageNum, PAGE_SIZE)
            // console.log(res);
        }
        this.setState({ loading: false })
        //取出分页数据,更新状态,显示分页列表
        if (res.status === 0) {
            const { total, list } = res.data
            this.setState({ total, products: list })
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        //获取一级分类列表
        this.getProducts(1)
    }
    render() {

        const { products, total, loading, searchType, searchName } = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: "150px" }}
                    onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: "150px", margin: " 0 20px" }}
                    onChange={e => this.setState({ searchName: e.target.value })}
                    value={searchName}
                ></Input>
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>

        )
        const extra = <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')} icon={<PlusOutlined />} > 添加</Button>
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    pagination={
                        {
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            total: total,
                            current: this.pageNum,
                            onChange: this.getProducts,
                        }
                    }
                />
            </Card>
        )
    }
}
export default ProductHome