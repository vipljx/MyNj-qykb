<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  provide() {
    return {
      // reload:this.reload
    };
  },
  data() {
    return {
      // isRouterAkive:true
    };
  },
  created() {
    
  },
  methods: {
    // reload(){
    //   this.isRouterAkive=false;
    //   this.$nextTick(()=>{
    //     this.isRouterAkive=true
    //   })
    // }
  }
};
</script>
<style lang="less">
#app {
  font-family: "微软雅黑", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666666;
}
// .el-notification{
//   background: #ffa200 !important;
// }
// .el-notification__title {
//   color: #fff !important;
// }
// .el-notification__content{
//   color: #fff !important;
// }
// .el-notification__closeBtn {
//   color: #fff !important;
// }
</style>
