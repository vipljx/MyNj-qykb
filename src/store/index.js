import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const state= localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) :{
  token:"1",
  isFlag:false,
  sfCode:"",
  phone:"",
  userName:""
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
