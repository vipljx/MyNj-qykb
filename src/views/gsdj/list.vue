<template>
  <div class="gsdj-list">
    <v-Header :isLine="true"></v-Header>
    <v-Cate
      name="工商登记"
      :isSearch="true"
      :isBoder="false"
      :isHeight="true"
      placeholder="请输入公司名称"
      @cateSearch="cateSearch"
    ></v-Cate>
    <div class="main">
      <ul class="list-ul">
        <li class="list-li" v-for="(tmpA,i) in list" :key="tmpA.rowId" @click="jumpA(i)">
          <div class="list-cont">
            <div class="list-title">{{tmpA.mCompanyName}}</div>
            <div class="list-legal">
              <div class="list-legal-img">
                <img src="../../assets/images/web/gsdj-tp5.png" alt />
              </div>
              公司法人: {{tmpA.mFrName}}
            </div>
            <div class="list-capital">
              <div class="list-legal-img">
                <img src="../../assets/images/web/gsdj-tp6.png" alt />
              </div>
              注册资本: {{tmpA.mCompanyCapi?tmpA.mCompanyCapi+"万元":"暂无数据"}}
            </div>
            <div class="list-add">
              <div class="list-legal-img">
                <img src="../../assets/images/web/gsdj-tp7.png" alt />
              </div>
              公司地址: {{tmpA.mCompanyAddr}}
            </div>
            <el-progress :percentage="tmpA.mProcessNum*25" :show-text="false"></el-progress>
            <ul class="progress">
              <li :class="{actived:tmpA.mProcessNum>=1}">工商</li>
              <li :class="{actived:tmpA.mProcessNum>=2}">刻章</li>
              <li :class="{actived:tmpA.mProcessNum>=3}">银行</li>
              <li :class="{actived:tmpA.mProcessNum>=4}">税务</li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="page" v-if="list.length!==0">
        <v-Page @parentPage="onPage" :total="total" :currentPage="params.pageNo"></v-Page>
      </div>
      <div class="height10"></div>
    </div>
    <v-None v-if="list.length===0" note="您暂无待办企业，请前往江苏工商登记网站注册企业信息"></v-None>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
import none from "_c/none";
import page from "_c/page";
//引入全局变量
import { storage } from "@/api/resource";

//调用接口
import { APIgsdj } from "@/api/index";
export const API = new APIgsdj();
export default {
  name: "gsdjList",
  data() {
    return {
      list: [],
      total: 0,
      params: {
        corpName: "",
        pageNo: 1,
        size: 6,
        sfCode: "",
        Authorization: ""
      }
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate,
    "v-None": none,
    "v-Page": page
  },
  created() {
    //初始化办理进度数据
    this.getMainProcessData();
    //获取办理进度数据参数
    this.params.sfCode = this.$store.state.sfCode;
    this.params.Authorization = this.$store.state.token;
  },
  methods: {
    //获取办理进度数据
    getMainProcessData() {
      API.getMainProcessData(this.params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.list = res.data.records;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页
    onPage(val) {
      this.params.pageNo = val;
      this.getMainProcessData();
    },

    //父组件搜索
    cateSearch(keyWords) {
      this.params.corpName = keyWords;
      this.getMainProcessData();
    },
    //跳转到工商登记的办理进度
    jumpA(i) {
      storage.set("msgCorp", this.list[i]);
      this.$router.push({
        path: "gsdjMsg"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 95.827%; //1309
  margin: 0 auto;
}
.height10 {
  height: 1rem;
}
.list-ul {
  .list-li {
    background: #ffffff;
    border-radius: 5px;
    width: 31.245%; //409
    box-shadow: 1px 0 16px #bebebe;
    height: 24rem;
    float: left;
    margin-right: 3.1325%;
    margin-bottom: 3rem;
    cursor: pointer;
    .list-cont {
      width: 87.53%; //358
      margin: 0 auto;
      > div {
        margin-top: 1.2rem;
      }
      > div:first-child {
        margin-top: 3rem;
      }

      .list-legal-img {
        margin-right: 5px;
      }
      .list-title {
        color: #333333;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .list-legal {
        font-size: 1.4rem;
        display: flex;
        .list-legal-img {
          width: 4.19%;
        }
      }
      .list-capital {
        font-size: 1.4rem;
        display: flex;
        .list-legal-img {
          width: 4.749%;
        }
      }
      .list-add {
        font-size: 1.4rem;
        display: flex;
        .list-legal-img {
          width: 3.631%;
        }
      }
      .progress {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        li {
          color: #999999;
          font-size: 1.2rem;
        }
        li.actived {
          color: #ffae20;
        }
      }
    }
  }
  li:nth-child(3n) {
    margin: 0;
  }
}
.list-ul:after {
  display: block;
  content: "clear";
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.page {
  text-align: right;
  margin-top: 1rem;
}
</style>
<style lang="less">
.el-progress-bar__inner {
  background: #ffae20;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ffbe4d;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ffbe4d;
}
</style>
