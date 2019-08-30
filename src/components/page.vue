<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props:["total","currentPage"],
  methods: {
    //分页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.$emit("parentPage",val)
    }
  }
};
</script>
<style lang="less" scoped>
</style>
