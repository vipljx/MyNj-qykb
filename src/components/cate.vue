<template>
  <div :class="['cate', 'main',isHeight?'height40':'']">
    <div class="cate-left">
      <span></span>
      {{name}}
    </div>
    <div :class="['search',isBoder?'noBoder':'']" v-if="isSearch">
      <input type="text" :placeholder="placeholder" v-model="keyWords" />
      <div class="search-ico" @click="search">
        <img src="../assets/images/web/gsdj-tp3.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyWords: "",
    }
  },
  props: ["name", "isSearch", "isBoder", "isHeight", "placeholder"],
  methods: {
    //子组件搜索
    search() {
      this.$emit("cateSearch",this.keyWords);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 95.827%; //1309
  margin: 0 auto;
}
.cate {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0 2.5rem 0;
  .cate-left {
    color: #333333;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      background: #ffa200;
      width: 0.5rem;
      height: 2rem;
      margin-right: 1.4rem;
    }
  }
  .search {
    width: 22%;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    background: #fff;
    height: 4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    input {
      border: 0;
      flex: 1;
      width: 93%;
    }
    .search-ico {
      margin-left: 1rem;
      width: 6.94%;
      cursor: pointer;
    }
  }
  .search.noBoder {
    border: none;
  }
}
.cate.height40 {
  padding: 4rem 0 4.5rem 0;
}
</style>
