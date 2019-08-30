//文件api，统一出口，方便模块使用
import {fetchPost,fetchGet} from './request'
//我的南京二维码用户服务
export class APImynj{
    constructor(){
    }
    //获取token
    getToken(param){
        return fetchPost('/auth/getPeopleToken',param);
    }
    //获取二维码
    getQrCode(param) {
        return fetchPost('/api/MyNjQrApi/getQrCode',param);
    }
    //获取用户信息
    getUserInfo(param) {
        return fetchPost('/api/MyNjQrApi/getUserInfo',param);
    }
}
//用户信息
export class APIuser{
    constructor(){
    }
    //用户是否已有信息存档
    getUserInfoFlag(param) {
        return fetchPost('/api/main/getUserInfoFlag',param);
    }
    //用户身份证信息上传
    addUserInfo(param) {
        return fetchPost('/api/main/addUserInfo',param);
    }
}
//工商登记
export class APIgsdj{
    constructor(){
    }
    //获取办理进度数据
    getMainProcessData(param) {
        return fetchPost('/api/main/getMainProcessData',param);
    }
    //获取对应公司办理流程数据
    getCorpProcessData(param) {
        return fetchPost('/api/main/getCorpProcessData',param);
    }
}
//印章刻制
export class APIblkz{
    constructor(){
    }
    //获取刻章店铺列表
    getKzCompanyData(params) {
        return fetchPost('/api/kz/getKzCompanyData',params);
    }
    //获取刻章店铺详情
    getKzCompanyDetail(params){
        return fetchPost('/api/kz/getKzCompanyDetail',params);
    }
    //刻章模糊查询获取列表
    getKzDataByCorpName(params){
        return fetchPost('/api/kz/getKzDataByCorpName',params);
    }
    //获取单个刻章订单流程数据
    getKzOrderDetail(params){
        return fetchPost('/api/kz/getKzOrderDetail',params);
    }
    //查看物流信息
    logisticsTrack(params){
        return fetchGet('/EMSApi/logisticsTrack',params);
    }
    //更新收货状态
    reKzOrder(params){
        return fetchPost('/api/kz/reKzOrder',params);
    }
    //保存刻章订单
    saveKzOrder(params){
        return fetchPost('/api/kz/saveKzOrder',params);
    }
    //更新支付状态  
    payKzOrder(params){
        return fetchPost('/api/kz/payKzOrder',params);
    }
    //更新评价状态
    talkKzOrder(params){
        return fetchPost('/api/kz/talkKzOrder',params);
    }
}
//银行基本开户申请
export class APIyhkh{
    constructor(){
    }
    //银行模糊查询获取列表
    getBkDataByCorpName(param) {
        return fetchPost('/api/bk/getBkDataByCorpName',param);
    }
    //获取银行网点列表
    getBkCompanyData(param){
        return fetchPost('/api/bk/getBkCompanyData',param);
    }
    //获取单个银行订单流程数据
    getBkOrderDetail(param){
        return fetchPost('/api/bk/getBkOrderDetail',param);
    }
    //提交银行订单数据
    saveBankOrder(param){
        return fetchPost('/api/bk/saveBankOrder',param);
    }
    //获取单个银行订单流程数据
    upBankOrderTalk(param){
        return fetchPost('/api/bk/upBankOrderTalk',param);
    }
}
//税务报到
export class APIsw{
    constructor(){
    }
    //税务模糊查询获取列表
    getSwDataByCorpName(params){
        return fetchPost('/api/sw/getSwDataByCorpName',params);
    }
    //获取单个公司税务相关所有数据
    getSwDataAllBySwMId(params){
        return fetchPost('/api/sw/getSwDataAllBySwMId',params);
    }
    //保存税务数据
    swApi_save(params){
        return fetchPost('/api/sw/swApi_save',params);
    }
}