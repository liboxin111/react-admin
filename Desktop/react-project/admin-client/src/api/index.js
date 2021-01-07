//包含应用中所有接口请求函数的模块
import ajax from './ajax'
//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')
//添加用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')
//获取分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })
export const reqUsers = () => ajax('/manage/user/list')
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', { userId }, 'POST')
//根据ID获取
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST')
//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })
// 搜索商品分页列表(名称)
// export const reqSearchProducts1 = ({ pageNum, pageSize, searchName }) => ajax('/manage/product/search', { pageNum, pageSize, productName: searchName })
// 搜索商品分页列表(描述)
// export const reqSearchProducts2 = ({ pageNum, pageSize, searchName }) => ajax('/manage/product/search', { pageNum, pageSize, productDesc: searchName })
//搜索商品分页列表 [searchType]  productName productDes  searchType的属性值作为属性名
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/product/search', { pageNum, pageSize, [searchType]: searchName })
//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')
//添加商品
// export const reqAddProduct = (product) => ajax('/manage/product/add', product, 'POST')
// //更新商品
// export const reqUpdateProduct = (product) => ajax('/manage/product/update', product, 'POST')
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
//更新状态
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, "POST")
//获取角色列表
export const reqGetRoles = () => ajax('/manage/role/list')
export const reqAddRole = (roleName) => ajax('/manage/role/add', { roleName }, 'POST')
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')


