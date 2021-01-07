import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../api'
import { IMG_URL } from '../../utils/consts'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    constructor(props) {
        super(props)
        let fileList = []
        console.log(this.props.imgs);
        const { imgs } = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: index,
                name: img,
                status: 'done',
                url: IMG_URL + img
            }))
        }
        this.state = {
            previewVisible: false, //标识是否显示大图预览
            previewImage: '',// 大图的URL
            previewTitle: '',
            fileList
        };
    }


    //获取所有已上传文件名的数组
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    //file 当前操作的图片文件
    // 所有已上传图片文件对象的数组
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange', file);
        console.log('handleChange', fileList);
        if (file.status === 'done') {
            const res = file.response
            if (res.status === 0) {
                message.success('上传图片成功')
                const { name, ulr } = res.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.ulr = ulr
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') {
            const res = await reqDeleteImg(file.name)
            console.log(res);
            if (res.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }

        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload" //上传图片的接口地址
                    accept='image/*' //只接受图片格式
                    fileList={fileList}  //所有上传图片文件的数组
                    name='image'  //请求参数名
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default PicturesWall