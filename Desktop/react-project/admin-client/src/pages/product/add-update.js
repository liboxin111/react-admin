import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Card, Button, Cascader, message } from 'antd';
import PictureWaill from './pictureWaill'
import RichText from './rich-text'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
const { TextArea } = Input;
class AddProductUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
        this.imgRef = React.createRef()
        this.richTextRef = React.createRef()
    }
    state = { options: [], parentId: '' }
    componentDidMount() {
        // console.log(this.formRef.current)
        this.getCategorys('0')
    }
    componentWillMount() {
        const product = this.props.location.state
        console.log(product);
        this.isUpdate = !!product
        console.log(this.isUpdate);
        this.product = product || {}
    }
    //async 函数的返回值是新的promise对象  promis的结果和值是由async的结果来决定的
    getCategorys = async (parentId) => {
        // this.setState({ loading: true })
        //获取一级分类列表
        const res = await reqCategorys(parentId)
        console.log(res);
        // this.setState({ loading: false })
        if (res.status === 0) {
            const categorys = res.data
            if (parentId === "0") {
                this.initOptions(categorys)
            } else {
                return categorys   //返回二级列表
            }
        }
    }
    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this
        const { pCategoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            const targetOption = options.find(option => option.value === pCategoryId)
            //关联到对应的一级option上
            targetOption.children = cOptions
        }
        this.setState({ options: [...options] })
    }

    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        // 根据选中的分类  获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false
        if (subCategorys && subCategorys.length > 0) {
            //生成二级列表的options
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            //关联对应的一级分类上
            targetOption.children = cOptions
        } else {
            //没有二级分类
            targetOption.isLeaf = true
        }
        this.setState({ options: [...this.state.options] })
    }
    validator = (rule, value) => {
        if (value > 0) {
            return Promise.resolve()
        } else {
            return Promise.reject('价格必须大于0')
        }
    }
    submit = (e) => {
        e.preventDefault();
        this.formRef.current.validateFields()
            .then(async values => {
                const { name, desc, price, fenlei } = values
                let pCategoryId, categoryId
                if (fenlei.length === 1) {
                    pCategoryId = '0'
                    categoryId = fenlei[0]
                } else {
                    pCategoryId = fenlei[0]
                    categoryId = fenlei[1]
                }
                const imgs = this.imgRef.current.getImgs()
                const detail = this.richTextRef.current.getDetail()
                const product = { name, desc, price, pCategoryId, categoryId, imgs, detail }
                if (this.isUpdate) {
                    product._id = this.product._id
                }
                const res = await reqAddOrUpdateProduct(product)
                console.log(product);
                console.log(res);
                if (res.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`)
                }
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            })
    }
    render() {
        const { isUpdate, product } = this
        //pCategoryId  categoryId
        const { pCategoryId, categoryId, imgs, detail } = product
        const fenlei = []
        console.log(isUpdate);
        if (isUpdate) {
            //一级分类
            if (pCategoryId === '0') {
                fenlei.push(categoryId)
            } else {
                //二级分类
                fenlei.push(pCategoryId)
                fenlei.push(categoryId)
            }

        }
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        }
        const title = (
            <>
                <Button type='link'
                    onClick={() => this.props.history.goBack()}
                    icon={<ArrowLeftOutlined style={{ fontSize: 20 }} />} />
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </>
        )
        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    initialValues={{
                        name: product.name,
                        price: product.price,
                        desc: product.desc,
                        fenlei,
                        img: [],
                        detail: product.detail,

                    }}
                >
                    <Form.Item label="商品名称"
                        name='name'
                        rules={[{
                            required: true,
                            message: '请输入商品内容!',
                        },]}
                    >
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item label="商品描述"
                        name='desc'
                        rules={[{
                            required: true,
                            message: '请输入商品描述!',
                        },]}>
                        <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 1, maxRows: 4 }} />
                    </Form.Item>
                    <Form.Item label="商品价格"
                        name='price'
                        rules={[
                            { required: true, message: "价格必须大于0" },
                            { validator: this.validator }
                        ]} >
                        <Input addonAfter='元' type='number' />
                    </Form.Item>
                    <Form.Item label="商品分类"
                        name='fenlei'
                        rules={[{
                            required: true,
                            message: '请选择商品分类',
                        },]} >
                        <Cascader
                            options={this.state.options} //列表显示的数据
                            loadData={this.loadData}//当选择每个列表项,加载下一级列表的监听回调
                        />
                    </Form.Item>
                    <Form.Item label="商品图片"
                        name='imgs'
                    >
                        <PictureWaill ref={this.imgRef} imgs={imgs} />
                    </Form.Item>
                    <Form.Item label="商品详情"
                        name='detail'
                        labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}
                    >
                        <RichText ref={this.richTextRef} detail={detail} />
                    </Form.Item>
                    <Form.Item label='' >
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>

        )
    }
}
export default AddProductUpdate