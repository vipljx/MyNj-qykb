//全局使用的常量
const kzOrderStatus={
    0:"未申请",
    1:"提交",
    2:"受理",
    3:"已支付",
    4:"已发货",
    5:"已取货",
    6:"已评价",
    
}
//银行开户搜索列表状态
const bkStatus={
    0:"未申请",
    1:"提交",
    2:"审核中",
    3:"获取预账号",
    4:"已评价",
    
}
//税务报到搜索列表状态
const swStatus={
    0:"已提交",
    1:"审核中",
    3:"已完成",
    null:"未申请"
}
const storage={
    set(key,val){
        localStorage.setItem(key,JSON.stringify(val))
    },
    get(key){
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key){
        localStorage.removeItem(key)
    }
}
//税务提交完成后二维码跳转地址
const swWechatUrl="http://www.mynj.cn?qt=3S21&qid=";
//税务办理审核通知书下载地址
const swDownloadUrl="https://etax.jiangsu.chinatax.gov.cn/portal/queryapi/ems/download.do?fileid=";
export {kzOrderStatus,bkStatus,swStatus,storage,swWechatUrl,swDownloadUrl}