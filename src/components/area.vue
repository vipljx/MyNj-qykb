<template>
  <div>
    <div class="list-top list-bj">
      <div class="list-cont">
        <ul class="list-top-ul">
          <li v-for="(tmp,i) in areaList" :key="i" :class="{actived:i===areaActived}" @click="onArea(i)">{{tmp.addrName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
//调用接口
import { APIblkz } from "../api/index";
export const API = new APIblkz();
export default {
  data() {
    return {
      areaActived:0
    };
  },
  props:["areaList"],
  created(){
   
  },
  methods: {
    //选择地区
    onArea(i){
      this.areaActived=i;
      this.$emit("parentArea",this.areaList[i].addrId)
    }
  },
};
</script>
<style lang="less" scoped>
.list-bj {
  background: #ffffff;
  box-shadow: 1px 0 16px #bebebe;
  border-radius: 5px;
  padding: 1.5rem 0;
  width: 100%;
}
.list-cont {
  width: 97.25%; //1273
  margin: 0 auto;
}
.list-top {
  .list-top-ul {
    li {
      float: left;
      width: 12%;
      text-align: center;
      padding: 1rem 0;
      margin: 0.5rem 0;
      color: #999999;
      font-size: 1.4rem;
      margin-right: 5.6%;
      border-radius: 5px;
      cursor: pointer;
    }
    li:hover {
      background: #ffbe4d;
      color: #ffffff;
    }
    li.actived {
      background: #ffbe4d;
      color: #ffffff;
    }
    li:nth-child(6n) {
      margin: 0;
    }
  }
  .list-top-ul:after {
    display: block;
    content: "clear";
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
}
</style>
<style lang="less">
</style>

