<template>
  <div class="yhyw-msg">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="填写银行基本户申请信息" :isSearch="false" :isHeight="false"></v-Cate>
    <div class="main">
      <div class="cartA yhyw-bj">
        <div class="yhyw-cont">
          <ul class="msg-bottom-ul">
            <li class="msg-bottom-li">
              <div class="msg-bottom-cate">
                <i></i>银行业务办理进度
              </div>
              <ul class="msg-bottom-li-ul">
                <li v-for="(tmpA,i) in process3" :key="i">
                  <div class="msg-bottom-li-ul-li-cont">
                    <div class="msg-bottom-li-ul-li-left">
                      <div class="msg-bottom-li-ul-li-img">
                        <img :src="tmpA.icos[tmpA.isSucess?1:0]" alt />
                      </div>
                      <div
                        :class="['msg-bottom-li-ul-li-bt',tmpA.isSucess?'actived':'']"
                      >{{tmpA.title}}</div>
                    </div>
                    <div class="msg-bottom-li-ul-li-right" v-if="i!==process3.length-1">
                      <i v-for="tmpB in 4" :key="tmpB" :class="{'actived':tmpA.isSucess}"></i>
                    </div>
                  </div>
                  <div
                    class="msg-bottom-li-ul-li-note"
                    v-show="tmpA.date"
                  >({{tmpA.name}} {{tmpA.date}})</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="height10"></div>
      <div class="msg-top yhyw-bj">
        <div class="yhyw-cont">
          <div class="msg-midddle-cate">网点信息</div>
          <div class="msg-top-cont">
            <div class="msg-top-left">
              <img :src="msgBank.bkImg" alt />
            </div>
            <div class="msg-top-right">
              <p>{{msgBank.bkName}}</p>
              <p>地址:{{msgBank.bkProvinceStr+msgBank.bkCityStr+msgBank.bkAreaStr}}</p>
              <p>电话: {{msgBank.bkMob}}</p>
              <div class="msg-top-xia">
                <div class="msg-top-sales">
                  <img src="../../assets/images/web/blkz-tp2.png" alt />
                  开户量: {{msgBank.bkYlTwo}}
                </div>
                <div class="msg-top-goods">
                  <img src="../../assets/images/web/blkz-tp3.png" alt />
                  好评: {{msgBank.bkYlOne}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="height10"></div>

      <el-form ref="form" label-width="120px">
        <div class="msg-middle yhyw-bj">
          <div class="yhyw-cont">
            <ul class="msg-middle-ul">
              <li class="msg-middle-li">
                <div class="msg-bottom-cate">
                  <i></i>基本信息
                </div>
                <ul class="msg-middle-li-ul">
                  <li>开户行：{{msgBank.bkName}}</li>
                  <li>账户名：{{msgCorp.mCompanyName}}</li>
                  <li>注册资本：{{msgCorp.bkCompanyCapi?msgCorp.bkCompanyCapi:main.mcompanyCapi}}万元</li>
                  <li>开户联系人电话：{{bk.bkMob}}</li>
                  <li>预账号：{{bk.preOpenAccount}}</li>
                </ul>
              </li>

              <li class="msg-middle-li">
                <div class="msg-bottom-cate">
                  <i></i>成员信息
                </div>
                <div class="msg-bottom-bt">a.法人</div>
                <ul class="msg-middle-li-ul">
                  <li>姓名：{{main.mfrName}}</li>
                  <li>证件号：{{main.mfrZjCode}}</li>
                  <li>联系电话：{{main.mylThree}}</li>
                </ul>
                <div class="msg-bottom-bt">b.股东</div>
                <ul class="msg-middle-li-ul" v-for="(tmp,i) of gd" :key="i">
                  <li>姓名：{{tmp.gdmc}}</li>
                  <li>证件号：{{tmp.gdzjhm}}</li>
                  <li>联系电话：暂无</li>
                </ul>
                <div class="msg-bottom-bt" v-if="false">c.大额付款联系人</div>
                <ul class="msg-middle-li-ul" v-if="false">
                  <li>姓名：暂无</li>
                  <li>证件号：暂无</li>
                  <li>联系电话：暂无</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="height10" v-show="isShow4 || bk.bkTalkNum"></div>
        <div class="cartE yhyw-bj" v-show="isShow4 || bk.bkTalkNum">
          <div class="yhyw-cont">
            <div class="msg-midddle-cate">评价</div>

            <el-rate v-model="params.bkTalkNum" :disabled="!!bk.bkTalkNum"></el-rate>

            <div class="evaluate" v-if="!!bk.bkTalkNum">
              <p>{{bk.bkTalkContent}}</p>
              <div>{{bk.bkTalkDate}}</div>
            </div>
            <div class="height10"></div>
            <el-input
              type="textarea"
              v-model="params.bkTalkContent"
              :rows="3"
              placeholder="快来评价一下吧~"
              v-if="!bk.bkTalkNum"
            ></el-input>
          </div>
        </div>
        <div class="height10" v-if="!bk.bkTalkNum"></div>
        <div class="cartF yhyw-bj" v-if="!bk.bkTalkNum">
          <button class="btn2" @click="evaluate" v-if="!isHiden1">立即评价</button>
          <div v-else>
            <button class="btn1" type="button" @click="cancel">取消</button>
            <button class="btn2" type="button" @click="submit">确认提交</button>
          </div>
        </div>
      </el-form>

      <div class="height20"></div>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import { storage } from "@/api/resource";
//调用接口
import { APIyhkh } from "@/api/index";
export const API = new APIyhkh();
export default {
  name: "yhywMsg",
  data() {
    return {
      process3: [
        {
          title: "提交申请",
          icos: [
            require("../../assets/images/web/iconU/tjsq.png"),
            require("../../assets/images/web/iconS/tjsq2.png")
          ],
          isSucess: true
        },
        {
          title: "审核中",
          icos: [
            require("../../assets/images/web/iconU/shz.png"),
            require("../../assets/images/web/iconS/shz.png")
          ],
          isSucess: true
        },
        {
          title: "产生预账号(完成)",
          icos: [
            require("../../assets/images/web/iconU/csyzh.png"),
            require("../../assets/images/web/iconS/csyzh.png")
          ],
          isSucess: true
        },
        {
          title: "评价",
          icos: [
            require("../../assets/images/web/iconU/pj.png"),
            require("../../assets/images/web/iconS/pj2.png")
          ],
          isSucess: false
        }
      ],
      isHiden1: false, //立即评价与取消/确认提交的切换显示
      isShow4: false,
      steps: "", //银行业务办理进度
      params: {
        bkMId: "", //银行订单Id
        bkTalkContent: "", //评价内容
        bkTalkNum: null, //评价星级
        Authorization: "" //Token
      },
      msgCorp: {}, //公司信息
      msgBank: {}, //银行信息
      bk: {},
      gd: [],
      main: {}
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  watch: {
    steps: function(val) {
      for (var i = 0; i < this.process3.length; i++) {
        if (i < val) {
          this.process3[i].isSucess = true;
        }else{
          this.process3[i].isSucess = false;
        }
      }
    },
    $route(to, from) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      //公司信息
      this.msgCorp = storage.get("msgCorp");
      //网点信息
      this.msgBank = storage.get("msgBank");
      //初始化参数
      this.params.bkMId = storage.get("msgCorp").bkMId;
      this.params.Authorization = this.$store.state.token;
      //初始化单个银行订单流程数据
      this.getBkOrderDetail();
    },
    //获取单个银行订单流程数据
    getBkOrderDetail() {
      API.getBkOrderDetail({
        bkMId: this.params.bkMId,
        bkBaseMId:this.msgBank.bkBaseMId,
        Authorization: this.params.Authorization
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.msgBank = res.data.baseInfo;
            this.bk = res.data.bk;
            this.process3[0].name = this.bk.bkSubmitName;
              this.process3[0].date = this.bk.bkSubmitTime
                ? this.formatDate(this.bk.bkSubmitTime)
                : "";
              this.process3[1].name = this.bk.bkVerifyName;
              this.process3[1].date = this.bk.bkVerifyTime
                ? this.formatDate(this.bk.bkVerifyTime)
                : "";
              this.process3[2].date = this.bk.bkReservationTime
                ? this.formatDate(this.bk.bkReservationTime)
                : "";
              this.process3[3].name = this.bk.bkSubmitName;
              this.process3[3].date = this.bk.bkTalkDate
                ? this.formatDate(this.bk.bkTalkDate)
                : "";
            if (this.bk.bkTalkNum) {
              this.params.bkTalkNum = this.bk.bkTalkNum;
              this.bk.bkTalkDate = this.formatDate(this.bk.bkTalkDate);
              //当前银行业务办理进度
              this.steps = this.bk.bkStatus;
              // this.process3[this.steps - 1].isSucess = true;
            }
            this.gd = res.data.gd;
            this.main = res.data.main;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即评价
    evaluate() {
      this.isShow4 = true;
      this.isHiden1 = true;
    },
    //取消
    cancel() {
      this.isShow4 = false;
      this.isHiden1 = false;
    },
    //上一步
    prev() {
      this.$router.go(-1);
    },
    //确认提交
    submit() {
      console.log(this.params);
      API.upBankOrderTalk(this.params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            //获取评价内容
            this.getBkOrderDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //时间戳转为日期格式
    formatDate(now) {
      now = new Date(now);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      if(month<10)month="0"+month;
      if(date<10)date="0"+date;
      if(hour<10)hour="0"+hour;
      if(minute<10)minute="0"+minute;
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  }
};
</script>
<style lang="less" scoped>
.yhyw-msg {
  background: #f7f7f7;
  min-height: 100vh;
}
.height10 {
  height: 1rem;
}
.height20 {
  height: 2rem;
}
.height30 {
  height: 3rem;
}
.main {
  width: 95.827%; //1309
  margin: 0 auto;
}
.yhyw-bj {
  background: #ffffff;
  box-shadow: 1px 0 16px #bebebe;
  border-radius: 5px;
  width: 100%;
}
.yhyw-cont {
  width: 97.25%; //1273
  margin: 0 auto;
}
.cartA {
  padding: 2rem 0;
  .msg-bottom-ul {
    .msg-bottom-li {
      border-bottom: 1px dashed #d9d9d9;
      .msg-bottom-cate {
        color: #333333;
        font-size: 1.4rem;
        i {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          display: inline-block;
          margin-right: 8px;
        }
      }
      .msg-bottom-li-ul {
        margin-top: 1.2rem;
        li {
          float: left;
          .msg-bottom-li-ul-li-cont {
            display: flex;
            .msg-bottom-li-ul-li-left {
              text-align: center;
              .msg-bottom-li-ul-li-img {
                margin: 0 auto;
                width: 4.8rem;
                height: 4.8rem;
              }
              .msg-bottom-li-ul-li-bt {
                color: #999999;
                font-size: 1.2rem;
                padding: 0.5rem 0;
              }
            }
            .msg-bottom-li-ul-li-right {
              display: flex;
              margin: 2rem 2.5rem 0 2.5rem;
              i {
                background: #cccccc;
                width: 8px;
                height: 8px;
                border-radius: 4px;
                display: inline-block;
                margin-right: 1.5rem;
              }

              i:last-child {
                margin: 0;
              }
            }
          }
          .msg-bottom-li-ul-li-note {
            max-width: 170px;
            color: #999999;
            font-size: 1.2rem;
          }
        }
      }
      .msg-bottom-li-ul:after {
        display: block;
        content: "clear";
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
      }
    }
    .msg-bottom-li:nth-child(1) {
      .msg-bottom-cate {
        i {
          background: #3faff0;
        }
      }
      .msg-bottom-li-ul {
        li {
          .msg-bottom-li-ul-li-left {
            .msg-bottom-li-ul-li-bt.actived {
              color: #3faff0;
            }
          }
          .msg-bottom-li-ul-li-right {
            i.actived {
              background: #3faff0;
            }
          }
        }
      }
    }

    .msg-bottom-li:last-child {
      border: 0;
    }
    .msg-bottom-li:first-child {
      padding-top: 0;
    }
  }
}
.msg-top {
  padding: 2rem 0;
  .msg-midddle-cate {
    color: #333333;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .msg-top-cont {
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
.msg-middle {
  padding: 2rem 0;
  .msg-middle-ul {
    .msg-middle-li {
      .msg-bottom-cate {
        color: #333333;
        font-size: 1.4rem;
        margin-bottom: 1.2rem;
        i {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          display: inline-block;
          margin-right: 8px;
        }
      }
      .msg-bottom-bt {
        color: #ffa200;
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        margin-left: 16px;
      }
      .msg-middle-li-ul {
        width: 100%;
        margin-bottom: 1rem;
        padding-left: 16px;
        box-sizing: border-box;
        li {
          float: left;
          margin-bottom: 1rem;
        }
        li:nth-child(1) {
          width: 20%;
        }
        li:nth-child(2) {
          width: 30%;
        }
        li:nth-child(3) {
          width: 25%;
        }
        li:nth-child(4) {
          width: 25%;
        }
      }
      .msg-middle-li-ul:after {
        display: block;
        content: "clear";
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
      .msg-middle-li-ul:last-child {
        margin-bottom: 0;
      }
    }
    .msg-middle-li:nth-child(1) {
      margin-bottom: 1.5rem;
      i {
        background: #1ec6a5;
      }
    }
    .msg-middle-li:nth-child(2) {
      i {
        background: #ffa200;
      }
    }
  }
}
.cartE {
  padding: 1rem 0;
  .msg-midddle-cate {
    color: #333333;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .el-textarea {
    width: 100%;
  }
  .evaluate {
    p {
      font-size: 1.4rem;
      padding: 0.5rem 0;
    }
    div {
      color: #999999;
      font-size: 1.2rem;
    }
  }
}
.cartF {
  padding: 2.5rem 0;
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

