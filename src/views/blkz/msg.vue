<template>
  <div class="blkz-msg">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="刻章店铺详情" :isSearch="false" :isHeight="false"></v-Cate>
    <div class="main">
      <div class="msg-top msg-bj">
        <div class="msg-cont">
          <div class="msg-top-left">
            <img :src="msg.kzMainImg" alt />
          </div>
          <div class="msg-top-right">
            <p>店铺: {{msg.kzCompanyName}}</p>
            <p>地址:{{msg.provinceName+msg.cityName+msg.areaName+msg.kzDzDetail}}</p>
            <p>电话: {{msg.kzMobPhone}}</p>
            <div class="msg-top-xia">
              <div class="msg-top-sales">
                <img src="../../assets/images/web/blkz-tp2.png" alt />
                销量: {{msg.kzOrderCount}}
              </div>
              <div class="msg-top-goods">
                <img src="../../assets/images/web/blkz-tp3.png" alt />
                好评: {{msg.kzEvaCount}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="height10"></div>
      <div class="msg-midddle msg-bj">
        <div class="msg-cont">
          <div class="msg-midddle-cate">刻章价格</div>
          <table class="msg-midddle-table" cellspacing="0" cellpadding="0">
            <thead>
              <th>印章类型</th>
              <th>印章材质</th>
            </thead>
            <tbody>
              <tr v-for="tmpA in msg.kzChapterInfoList" :key="tmpA.kzChapterId">
                <td>{{tmpA.kzChapterName}}</td>
                <td>
                  <ul>
                    <li
                      v-for="tmpB in tmpA.kzChapterSpecInfoList"
                      :key="tmpB.kzChapSpecId"
                    >{{tmpB.kzChapSpecName}}/￥{{tmpB.kzChapSpecPrice}}</li>
                    
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="height10"></div>
      <div class="msg-bottom msg-bj">
        <button class="btn2" @click="buy">立即购买</button>
      </div>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import {storage} from "@/api/resource";
//调用接口
import { APIblkz } from "@/api/index";
export const API = new APIblkz();
export default {
  name: "blkzMsg",
  data() {
    return {
      msg: {}
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  created() {
    //初始化刻章店铺详情
    this.getKzCompanyDetail();
    //console.log(this.$route.query.kzCompanyId)
  },
  methods: {
    //获取刻章店铺详情
    getKzCompanyDetail() {
      API.getKzCompanyDetail({
        kzCompanyId: this.$route.query.kzCompanyId,
        Authorization: this.$store.state.token
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.msg = res.data;
            storage.set("msgShop",res.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即购买
    buy() {
      this.$router.push({
        path: "blkzCart"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.blkz-msg {
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
.msg-bj {
  background: #ffffff;
  box-shadow: 1px 0 16px #bebebe;
  border-radius: 5px;
  width: 100%;
}
.msg-cont {
  width: 97.25%; //1273
  margin: 0 auto;
}
.msg-top {
  padding: 2rem 0;
  .msg-cont {
    display: flex;
    .msg-top-left {
      width: 11.076%;
      margin-right: 1%;
      height: 10.1rem;
      img{
        height: 100%;
      }
    }
    .msg-top-right {
      width: 87%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 1.2rem;
      }
      .msg-top-xia {
        display: flex;
        align-items: center;
        color: #ffb22c;
        font-size: 1.2rem;
        img {
          width: 13.538%;
          margin-right: 0.5rem;
        }
        .msg-top-sales {
          min-width: 90px;
          margin-right: 2rem;
        }
        .msg-top-goods {
          min-width: 90px;
        }
      }
    }
  }
}
.msg-midddle {
  padding: 1rem 0 2rem 0;
  .msg-midddle-cate {
    color: #333333;
    font-size: 1.4rem;
  }
  .msg-midddle-table {
    margin-top: 1rem;
    // width: 52.63%; //670
    width: 100%;
    font-size: 1.2rem;
    thead {
      background: #f2f2f2;
      th {
        line-height: 4.5rem;
      }
    }
    tbody {
      tr {
        td {
          border-bottom: 1px solid #d9d9d9;
          line-height: 4.4rem;
          text-align: center;
          ul{
            li{
              float: left;
              width: 25%;
            }
          }
        }
      }
      tr:last-child {
        td {
          border-bottom: none;
        }
      }
      
    }
  }
}
.msg-bottom {
  padding: 2rem 0;
  text-align: center;
  button {
    color: #fff;
    font-size: 1.6rem;
    padding: 1rem 0;
    width: 10.8%;
    border: 0;
    border-radius: 3px;
  }
  button:nth-child(2) {
    margin-left: 6.875%;
  }
  button.btn1 {
    background: #cccccc;
  }
  button.btn2 {
    background: #ffa200;
  }
}
</style>
<style lang="less">
</style>

