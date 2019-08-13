<template>
  <div>
    <header>
      <div class="logo" @click="back">
        <img src="../assets/images/web/gsdj-tp1.png" alt />
      </div>
      <div class="menu">
        <ul class="menu-ul">
          <li>
            <div class="el-dropdown" @click="jumpA(1)" :class="{active:menuActive==1}">
              <span class="el-dropdown-link">工商登记</span>
            </div>
          </li>
          <li>
            <el-dropdown
              trigger="hover"
              placement="bottom"
              @visible-change="handleVisible2"
              :class="[dropActive2?'active':'',menuActive==2?'active':'']"
            >
              <span class="el-dropdown-link" @click="jumpA(2)">印章刻制</span>
              <el-dropdown-menu slot="dropdown">
                <div class="dropdown-cont">
                  <div class="search">
                    <input type="text" placeholder="请输入公司名称" v-model="keyWordsA" />
                    <div class="search-ico" @click="searchA()">
                      <img src="../assets/images/web/gsdj-tp3.png" alt />
                    </div>
                  </div>
                  <ul class="dropdown-ul">
                    <li @click="jumpB(2,i)" v-for="(tmp,i) in listA" :key="tmp.mid">
                      <div class="dropdown-bt">{{tmp.kzOrderMainInfo.kzInfoCompanyName}}</div>
                      <div
                        class="dropdown-state"
                      >{{kzOrderStatus[tmp.kzOrderMainInfo.kzOrderStatus]}}</div>
                      <!-- tmp.kzOrderMainInfo.kzOrderStatus -->
                      <div class="dropdown-img">
                        <img src="../assets/images/web/gsdj-tp4.png" alt />
                      </div>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown
              trigger="hover"
              placement="bottom"
              @visible-change="handleVisible3"
              :class="[dropActive3?'active':'',menuActive==3?'active':'']"
            >
              <span class="el-dropdown-link" @click="jumpA(3)">银行基本户申请</span>
              <el-dropdown-menu slot="dropdown">
                <div class="dropdown-cont">
                  <div class="search">
                    <input type="text" placeholder="请输入公司名称" v-model="keyWordsB" />
                    <div class="search-ico" @click="searchB()">
                      <img src="../assets/images/web/gsdj-tp3.png" alt />
                    </div>
                  </div>
                  <ul class="dropdown-ul">
                    <li @click="jumpB(3,i)" v-for="(tmp,i) in listB" :key="tmp.mid">
                      <div class="dropdown-bt">{{tmp.mCompanyName}}</div>
                      <div class="dropdown-state">{{bkStatus[tmp.bkStatus]}}</div>
                      <div class="dropdown-img">
                        <img src="../assets/images/web/gsdj-tp4.png" alt />
                      </div>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown
              trigger="hover"
              placement="bottom"
              @visible-change="handleVisible4"
              :class="[dropActive4?'active':'',menuActive==4?'active':'']"
            >
              <span class="el-dropdown-link" @click="jumpA(4)">税务报到</span>
              <el-dropdown-menu slot="dropdown">
                <div class="dropdown-cont">
                  <div class="search">
                    <input type="text" placeholder="请输入公司名称" v-model="keyWordsC" />
                    <div class="search-ico" @click="searchC()">
                      <img src="../assets/images/web/gsdj-tp3.png" alt />
                    </div>
                  </div>
                  <ul class="dropdown-ul">
                    <li @click="jumpB(4,i)" v-for="(tmp,i) in listC" :key="tmp.mid">
                      <div class="dropdown-bt">{{tmp.mcompanyName}}</div>
                      <div class="dropdown-state">{{swStatus[tmp.swMainInfo.swStatus]}}</div>
                      <div class="dropdown-img">
                        <img src="../assets/images/web/gsdj-tp4.png" alt />
                      </div>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <div class="clear"></div>
        </ul>
      </div>
      <div class="user">
        <el-menu class="el-menu-demo" mode="horizontal" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <img src="../assets/images/web/gsdj-tp2.png" alt class="user-tp" />
              {{$store.state.userName}}
            </template>
            <el-menu-item index="1-1" @click="out">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </header>
    <div class="line" v-if="isLine"></div>
  </div>
</template>
<script>
//引入全局变量
import { kzOrderStatus, bkStatus, swStatus, storage } from "../api/resource";
//引入vuex
import { mapMutations } from "vuex";
//调用接口
import { APIblkz, APIyhkh, APIsw } from "../api/index";
export const API1 = new APIblkz();
export const API2 = new APIyhkh();
export const API3 = new APIsw();
export default {
  data() {
    return {
      dropActive2: false,
      dropActive3: false,
      dropActive4: false,
      menuActive: 1, //导航高亮
      keyWordsA: "", //印章刻制搜索关键字
      keyWordsB: "", //银行开户搜索关键字
      keyWordsC: "", //税务报到搜索关键字
      kzOrderStatus: {}, //印章刻制搜索列表状态
      bkStatus: {}, //银行开户搜索列表状态
      swStatus: {}, //税务报到搜索列表状态
      listA: [], //印章刻制搜索列表
      listB: [], //银行开户搜索列表
      listC: [] //税务报到搜索列表
    };
  },
  props: ["isLine"],
  created() {
    this.menuActive = sessionStorage.getItem("menu");
    this.kzOrderStatus = kzOrderStatus;
    this.bkStatus = bkStatus;
    this.swStatus = swStatus;
  },

  methods: {
    ...mapMutations([
      "addUser", // 将 `this.addUser()` 映射为 `this.$store.commit('addUser')`
      "updateFlag" // 将 `this.updateFlag()` 映射为 `this.$store.commit('updateFlag')`
    ]),
    //退出
    out() {
      this.$confirm("您确定要退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addUser({});
          this.updateFlag(false);
          storage.remove("state");
          this.$router.push({
            name: "loginOne"
          });
        })
        .catch(() => {});
    },
    back() {
      this.$router.push({
        path: "gsdjList"
      });
    },
    //印章刻制搜索
    searchA(size) {
      API1.getKzDataByCorpName({
        sfCode: this.$store.state.sfCode,
        Authorization: this.$store.state.token,
        corpName: this.keyWordsA
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            if (size) {
              this.listA = res.data.slice(0, size);
            } else {
              this.listA = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //银行开户搜索
    searchB(size) {
      API2.getBkDataByCorpName({
        sfCode: this.$store.state.sfCode,
        Authorization: this.$store.state.token,
        corpName: this.keyWordsB
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            //console.log(size);
            if (size) {
              this.listB = res.data.slice(0, size);
            } else {
              this.listB = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //税务报到搜索
    searchC(size) {
      API3.getSwDataByCorpName({
        sfCode: this.$store.state.sfCode,
        Authorization: this.$store.state.token,
        corpName: this.keyWordsC
      })
        .then(res => {
          //console.log(res);
          if (res.code === 0) {
            if (size) {
              this.listC = res.data.slice(0, size);
            } else {
              this.listC = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //路由跳转
    jumpA(i) {
      if (i === 1) {
        this.$router.push({
          path: "gsdjList"
        });
      }
    },
    //子菜单跳转
    jumpB(num, i) {
      if (num === 2) {
        if (this.listA[i].kzOrderMainInfo.kzOrderStatus == 0) {
          this.$router.push({
            path: "blkzList",
            query: {
              index: i
            }
          });
        } else {
          //console.log("22");
          this.$router.push({
            path: "blkzPay",
            query: {
              index: i
            }
          });
        }
        //this.reload();
        storage.set("msgShop", this.listA[i].kzCompanyInfo);
        storage.set("msgCorp", this.listA[i]);
      } else if (num === 3) {
        if (this.listB[i].bkStatus == 0) {
          this.$router.push({
            path: "yhywList",
            query: {
              index: i
            }
          });
        } else {
          this.$router.push({
            path: "yhywMsg",
            query: {
              index: i
            }
          });
        }
        //this.reload();
        storage.set("msgBank", this.listB[i]);
        storage.set("msgCorp", this.listB[i]);
      } else if (num === 4) {
        if (this.listC[i].bkStatus < 1) {
          this.$notify({
            title: "警告",
            message: "请先提交申请银行业务！",
            type: "warning"
          });
          return;
        }
        if (this.listC[i].swMainInfo.swStatus == null) {
          this.$router.push({
            path: "swApply",
            query: {
              index: i
            }
          });
        } else {
          this.$router.push({
            path: "swMsg",
            query: {
              index: i
            }
          });
        }
        // this.reload();
        storage.set("msgCorp", this.listC[i]);
      }
    },
    handleVisible2(v) {
      this.dropActive2 = v; //true or false
      if (v) {
        this.searchA(3);
      }
    },
    handleVisible3(v) {
      this.dropActive3 = v; //true or false
      if (v) {
        this.searchB(3);
      }
    },
    handleVisible4(v) {
      this.dropActive4 = v; //true or false
      if (v) {
        this.searchC(3);
      }
    }
  }
};
</script>
<style lang="less" scoped>
header {
  height: 7rem;
  display: flex;
  align-items: center;
  background: #ffffff;
  .logo {
    width: 381 * @precision;
    margin-left: 2rem;
    cursor: pointer;
  }
  .menu {
    flex: 1;
    display: flex;
    text-align: center;
    justify-content: center;
    height: 100%;
    //导航菜单
    .el-submenu {
      height: 100%;
    }
    .is-opened {
      background: #ffa200;
    }
    //下拉菜单
    .menu-ul {
      display: flex;
      height: 100%;
      li {
        margin: 0 1rem;
        cursor: pointer;
        .el-dropdown {
          height: 100%;
          .el-dropdown-link {
            display: flex;
            align-items: center;
            padding: 0 1.5rem;
            height: 100%;
          }
        }
        .el-dropdown:hover .el-dropdown-link {
          background: #ffa200;
          color: #ffffff;
        }
        .el-dropdown.active .el-dropdown-link {
          background: #ffa200;
          color: #ffffff;
        }
      }
    }
  }
  .user {
    height: 100%;
    .user-tp {
      height: 4.4rem;
      width: auto;
    }
  }
}
.dropdown-cont {
  width: 93.89%;
  margin: 0 auto;
  .search {
    border: 1px solid #cccccc;
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      border: 0;
      width: 92%;
    }
    .search-ico {
      width: 7.89%;
      cursor: pointer;
    }
  }
  .dropdown-ul {
    margin-top: 1rem;
    li {
      display: flex;
      padding: 0.5rem 0;
      cursor: pointer;
      .dropdown-bt {
        font-size: 1.2rem;
        flex: 1;
      }
      .dropdown-state {
        color: #999999;
        font-size: 1.2rem;
      }
      .dropdown-img {
        margin-left: 0.8rem;
        width: 3.175%;
      }
    }
  }
}
.line {
  background: #f2f2f2;
  height: 1rem;
}
</style>
<style lang="less">
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}
.el-menu--popup-bottom-start {
  margin-top: 0;
}
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  width: 100%;
  min-width: 105px;
}
.el-menu-item {
  text-align: center;
}
.el-dropdown-menu {
  width: 213 * @precision;
  left: 100px;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 5px;
}

//下拉菜单
.el-submenu__icon-arrow {
  display: none;
}
.el-submenu__title:hover {
  background: none;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border: 0;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 7rem;
  line-height: 7rem;
}
</style>
