
//引入 polyfill
import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

//引入css
import "./assets/css/css.less" 

//引入axios，并加到原型链中
import axios from "axios";
Vue.prototype.$axios = axios;
import QS from "qs";
Vue.prototype.qs = QS;

//引入 Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);




//路由守卫
router.beforeEach((to, from, next) => {
  //console.log(to)
  if(to.name.indexOf("gsdj")!==-1){
    sessionStorage.setItem("menu",1)
  }else if(to.name.indexOf("blkz")!==-1){
    sessionStorage.setItem("menu",2)
  }else if(to.name.indexOf("yhyw")!==-1){
    sessionStorage.setItem("menu",3)
  }else if(to.name.indexOf("sw")!==-1){
    sessionStorage.setItem("menu",4)
  }else{
    sessionStorage.removeItem("menu",4)
  }
  next();
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
