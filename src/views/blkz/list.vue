<template>
  <div class="blkz-list">
    <v-Header :isLine="false"></v-Header>
    <v-Cate
      name="选择刻章店铺"
      :isSearch="true"
      :isBoder="true"
      :isHeight="false"
      placeholder="请输入刻章店铺名称"
      @cateSearch="cateSearch"
    ></v-Cate>
    <div class="main">
      <v-Area :areaList="areaList" @parentArea="onArea"></v-Area>
      <div class="height10"></div>
      <div class="list-bottom list-bj">
        <div class="list-cont">
          <ul class="screen">
            <li
              v-for="(tmp,i) in screenList"
              :key="i"
              :class="{actived:i===screenaActived}"
              @click="onScreen(i)"
            >{{tmp.name}}</li>
          </ul>

          <ul class="list-bottom-ul">
            <li v-for="(tmp,i) in list" :key="tmp.kzCompanyId" @click="jumpA(i)">
              <div class="list-bottom-li-cont">
                <div class="list-bottom-li-left">
                  <img :src="tmp.kzMainImg" alt />
                </div>
                <div class="list-bottom-li-right">
                  <p>店铺: {{tmp.kzCompanyName}}</p>
                  <p>地址:{{tmp.provinceName+tmp.cityName+tmp.areaName+tmp.kzDzDetail}}</p>
                  <p>电话: {{tmp.kzMobPhone}}</p>
                  <div class="list-bottom-li-xia">
                    <div class="list-bottom-li-sales">
                      <img src="../../assets/images/web/blkz-tp2.png" alt />
                      销量: {{tmp.kzOrderCount}}
                    </div>
                    <div class="list-bottom-li-goods">
                      <img src="../../assets/images/web/blkz-tp3.png" alt />
                      好评: {{tmp.kzEvaCount}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          
          <div class="page" v-if="list.length!==0">
            <v-Page @parentPage="onPage" :total="total"></v-Page>
          </div>
          <div class="height10"></div>
         
        </div>
         <v-None v-if="list.length===0" note="您暂无刻章店铺！"></v-None>
      </div>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
import area from "_c/area";
import none from "_c/none";
import page from "_c/page";

//调用接口
import { APIblkz } from "@/api/index";
export const API = new APIblkz();
export default {
  name: "blkzList",
  data() {
    return {
      areaList: [],
      screenList: [
        {
          name: "综合"
        },
        {
          name: "销量"
        },
        {
          name: "好评"
        }
      ],
      screenaActived: 0,
      total: 0,
      params: {
        Authorization: "", //Token
        kzCompanyName: "", //店铺名称
        kzDzArea: null, //区域编码
        pageNo: 1, //页码
        size: 6, //条数
        saleOrder: false, //是否按销量排序
        talkOrder: false //	是否好评量排序
      },
      areaList: [], //地区列表
      list: [] //店铺列表
    };
  },

  components: {
    "v-Header": header,
    "v-Cate": cate,
    "v-Area": area,
    "v-None": none,
    "v-Page": page
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  created() {
    this.init()
  },
  methods: {
    //初始化
    init(){
      //获取vuex里的token
    this.params.Authorization = this.$store.state.token;
    //初始化刻章店铺列表
    this.getKzCompanyData();
    },
    //父组件搜索
    cateSearch(keyWords) {
      console.log("cate子组件搜索");
      this.params.kzCompanyName = keyWords;
      this.getKzCompanyData();
    },
    //获取刻章店铺列表
    getKzCompanyData() {
      API.getKzCompanyData(this.params)
        .then(res => {
          console.log(res.data.pageList.records);
          if (res.code === 0) {
            //地区列表
            res.data.sddrList.unshift({
              addrName: "全部",
              addrId: null
            });
            this.areaList = res.data.sddrList;
            //店铺列表
            this.list = res.data.pageList.records;
            this.total = res.data.pageList.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //筛选属性
    onScreen(i) {
      if (i === 0) {
        this.params.saleOrder = false;
        this.params.talkOrder = false;
        this.screenaActived = 0;
      } else if (i === 1) {
        this.params.saleOrder = true;
        this.params.talkOrder = false;
        this.screenaActived = 1;
      } else if (i === 2) {
        this.params.saleOrder = false;
        this.params.talkOrder = true;
        this.screenaActived = 2;
      }
      this.getKzCompanyData();
    },
    //筛选地区
    onArea(addrId) {
      this.params.kzDzArea = addrId;
      this.getKzCompanyData();
    },
    //分页
    onPage(val) {
      this.params.pageNo = val;
      this.getKzCompanyData();
    },
    //跳转到刻章店铺详情
    jumpA(i) {
      this.$router.push({
        path: "blkzMsg",
        query: {
          kzCompanyId: this.list[i].kzCompanyId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.blkz-list {
  background: #f7f7f7;
  min-height: 100vh;
}
.height10 {
  height: 1rem;
}
.main {
  width: 95.827%; //1309
  margin: 0 auto;
}
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

.list-bottom {
  .screen {
    margin-bottom: 0.5rem;
    li {
      float: left;
      font-size: 1.4rem;
      color: #999999;
      background: #f5f5f5;
      width: 6.048%;
      height: 3.2rem;
      line-height: 3.2rem;
      text-align: center;
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
  }
  .screen:after {
    display: block;
    content: "clear";
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .list-bottom-ul {
    li {
      float: left;
      background: #ffffff;
      box-shadow: 1px 0 16px #bebebe;
      border-radius: 5px;
      padding: 3rem 0;
      width: 31.7%; //404
      margin-right: 2.45%;
      margin-top: 1rem;
      cursor: pointer;
      .list-bottom-li-cont {
        width: 89.1089%; //360
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .list-bottom-li-left {
          width: 39.166%;
          height: 10.1rem;
          img{
            height: 100%;
          }
        }
        .list-bottom-li-right {
          width: 57.5%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            font-size: 1.2rem;
          }
          .list-bottom-li-xia {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ffb22c;
            font-size: 1.2rem;

            img {
              width: 11.538%;
              margin-right: 0.5rem;
            }
            .list-bottom-li-sales {
              width: 50%;
            }
            .list-bottom-li-goods {
              width: 50%;
              text-align: right;
            }
          }
        }
      }
    }
    li:nth-child(3n) {
      margin-right: 0;
    }
  }
  .list-bottom-ul:after {
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
}
</style>
<style lang="less">
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ffbe4d;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ffbe4d;
}
</style>

