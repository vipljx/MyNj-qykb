//添加token
export const addToken=(state, token)=>{
    state.token=token;
    //vuex刷新页面数据丢失
    localStorage.setItem('state', JSON.stringify(state))
}
//添加用户信息
export const addUser=(state, userInfo)=>{
    //console.log(userInfo)
    state.sfCode=userInfo.userSfCode;
    state.phone=userInfo.userPhone;
    state.userName=userInfo.userName;
    // state.sfCode="320112199106251219";
    // state.phone="18795819166";
    // state.userName="林家欣";
    //vuex刷新页面数据丢失
    localStorage.setItem('state', JSON.stringify(state))
}
//更新用户是否身份认证
export const updateFlag=(state, flag)=>{
     state.isFlag=flag;
     //vuex刷新页面数据丢失
     localStorage.setItem('state', JSON.stringify(state))
 }
 //删除用户信息
 export const delUser=(state)=>{
    state.token="";
    state.isFlag=false;
    state.sfCode="";
    state.phone="";
    state.userName="";
    //vuex刷新页面数据丢失
    console.log(state)
    localStorage.setItem('state', JSON.stringify(state))
}