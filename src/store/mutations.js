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
export const updateFlag=(state, flag)=>{
     state.isFlag=flag;
     //vuex刷新页面数据丢失
     localStorage.setItem('state', JSON.stringify(state))
 }