<template>
  <div class="blkz-list">
    <v-Header :isLine="false"></v-Header>
    <v-Cate
      name="选择银行网点"
      :isSearch="true"
      :isBoder="true"
      :isHeight="false"
      placeholder="请输入银行名称"
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
              :class="{actived:i===screenActived}"
              @click="onScreen(i)"
            >{{tmp.name}}</li>
            <li class="list-bank" :class="{actived:screenList.length===screenActived}">
              <el-dropdown
                placement="bottom"
                trigger="hover"
                size="small"
                @visible-change="handleVisible"
                @command="onBank"
                :class="{active:dropActive}"
              >
                <span class="el-dropdown-link">
                  {{bankActivedName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="list-bank-dropdown">
                  <el-dropdown-item
                    v-for="(tmp,i) in bankList"
                    :key="i"
                    :command="i"
                    :class="{actived:i===bankActived}"
                  >{{tmp.dictName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

          <ul class="list-bottom-ul">
            <li v-for="(tmp,i) in list" :key="i" @click="jumpA(i)">
              <div class="list-bottom-li-cont">
                <div class="list-bottom-li-left">
                  <img :src="tmp.bkImg" alt />
                </div>
                <div class="list-bottom-li-right">
                  <p>{{tmp.bkName}}</p>
                  <p>地址:{{tmp.bkProvinceStr+tmp.bkCityStr+tmp.bkAreaStr}}</p>
                  <p>电话: {{tmp.bkMob}}</p>
                  <div class="list-bottom-li-xia">
                    <div class="list-bottom-li-sales">
                      <img src="../../assets/images/web/blkz-tp2.png" alt />
                      开户量: {{tmp.bkYlTwo}}
                    </div>
                    <div class="list-bottom-li-goods">
                      <img src="../../assets/images/web/blkz-tp3.png" alt />
                      好评: {{tmp.bkYlOne}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-if="list.length!==0">
            <v-Page @parentPage="onPage" :total="total" :currentPage="params.pageNo"></v-Page>
          </div>
          <div class="height10"></div>
        </div>
        <v-None v-if="list.length===0" note="您暂无刻银行列表！"></v-None>
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
//引入全局变量
import { storage } from "@/api/resource";
//调用接口
import { APIyhkh } from "@/api/index";
export const API = new APIyhkh();
export default {
  name: "yhywList",
  data() {
    return {
      dropActive: false, //下拉菜单
      areaList: [],
      screenActived: 0,
      bankActived: 0,
      bankActivedName: "银行",
      total: 0,
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
      bankList: [],
      params: {
        Authorization: "", //Token
        bkName: "", //店铺名称
        bkArea: null, //区域编码
        bkType: "", //银行类别
        pageNo: 1, //页码
        size: 6, //条数
        saleOrder: false, //是否按开户量排序
        talkOrder: false //	是否好评量排序
      },
      list: []
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate,
    "v-Area": area,
    "v-None": none,
    "v-Page": page
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  methods: {
    //初始化
    init() {
      //获取vuex里的token
      this.params.Authorization = this.$store.state.token;
      //初始化银行网点列表
      this.getBkCompanyData();
    },
    //获取银行网点列表
    getBkCompanyData() {
      API.getBkCompanyData(this.params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            //地区列表
            res.data.address.unshift({
              addrName: "全部",
              addrId: null
            });
            this.areaList = res.data.address;
            //银行列表
            res.data.dict.unshift({
              dictName: "全部",
              dictId: null
            });
            this.bankList = res.data.dict;
            //店铺列表
            this.list = res.data.kz.records;
            this.total = res.data.kz.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //下拉菜单
    handleVisible(v) {
      this.dropActive = v; //true or false
    },
    //父组件搜索
    cateSearch(keyWords) {
      this.params.bkName = keyWords;
      this.getBkCompanyData();
    },
    //筛选属性
    onScreen(i) {
      console.log(this.screenList);
      this.params.pageNo = 1;
      if (i === 0) {
        this.params.saleOrder = false;
        this.params.talkOrder = false;
        this.screenActived = 0;
      } else if (i === 1) {
        this.params.saleOrder = true;
        this.params.talkOrder = false;
        this.screenActived = 1;
      } else if (i === 2) {
        this.params.saleOrder = false;
        this.params.talkOrder = true;
        this.screenActived = 2;
      }
      this.getBkCompanyData();
    },
    //筛选银行
    onBank(command) {
      console.log(command);

      this.screenActived = this.screenList.length;
      this.bankActived = command;
      this.params.bkType = this.bankList[command].dictId;
      this.bankActivedName = this.bankList[command].dictName;

      this.params.pageNo = 1;
      this.getBkCompanyData();
    },
    //筛选地区
    onArea(addrId) {
      this.params.pageNo = 1;
      this.params.bkArea = addrId;
      this.getBkCompanyData();
    },
    //分页
    onPage(val) {
      this.params.pageNo = val;
      this.getBkCompanyData();
    },
    //跳转到刻章店铺详情
    jumpA(i) {
      this.$router.push({
        path: "yhywApply"
      });
      storage.set("msgBank", this.list[i]);
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
      width: 6.048%;
      height: 3.2rem;
      line-height: 3.2rem;
      text-align: center;
      font-size: 1.4rem;
      color: #999999;
      background: #f5f5f5;

      cursor: pointer;
    }
    li:hover {
      background: #ffbe4d;
      color: #ffffff;
    }
    li.actived {
      background: #ffbe4d;
      color: #ffffff;
      .el-dropdown {
        color: #ffffff;
      }
    }
    .list-bank {
      width: 7.048%;
      .el-dropdown {
        color: #999999;
        width: 100%;
        height: 100%;
        display: inline-block;
        span {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
      .el-dropdown.active {
        background: #ffbe4d;
        color: #ffffff;
      }
    }
    .list-bank:hover {
      .el-dropdown {
        color: #ffffff;
      }
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
          img {
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
.list-bank-dropdown {
  .popper__arrow {
    display: none;
  }
  .el-dropdown-menu__item {
    line-height: 25px;
    text-align: center;
  }
  .el-dropdown-menu__item:hover {
    background: none;
    color: #ffbe4d;
  }
  .el-dropdown-menu__item.actived {
    background: none;
    color: #ffbe4d;
  }
}
.el-dropdown-menu--small .el-dropdown-menu__item {
  padding: 0 20px;
}
.list-bank-dropdown.el-popper[x-placement^="bottom"] {
  margin-top: 0;
}
.list-bank-dropdown.el-dropdown-menu {
  width: auto;
  border: 0;
  border-radius: 0;
  box-shadow: 1px 0 16px #bebebe;
  padding: 0;
}
</style>

