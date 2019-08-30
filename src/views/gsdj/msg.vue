<template>
  <div class="gsdj-msg">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="办理进度" :isHeight="false" :isSearch="false"></v-Cate>
    <div class="main">
      <div class="msg-top msg-bj">
        <div class="msg-cont">
          <div class="msg-top-cate">
            <i></i>办理公司
          </div>
          <ul class="msg-top-ul">
            <li>公司名称：{{msgCorp.mCompanyName}}</li>
            <li>经办人：{{msgCorp.mFrName}}</li>
            <li>经办人联系电话：{{msgCorp.mYlThree}}</li>
          </ul>
        </div>
      </div>
      <div class="height10"></div>
      <div class="msg-bottom msg-bj">
        <div class="msg-cont">
          <div class="msg-bottom-left">
            <span :style="{height:msgCorp.mProcessNum*25+'%'}"></span>
          </div>
          <div class="msg-bottom-right">
            <ul class="msg-bottom-ul">
              <li class="msg-bottom-li">
                <div class="msg-bottom-cate">
                  <i></i>工商办理进度
                </div>
                <ul class="msg-bottom-li-ul">
                  <li v-for="(tmpA,i) in process1" :key="i">
                    <div class="msg-bottom-li-ul-li-cont">
                      <div class="msg-bottom-li-ul-li-left">
                        <div class="msg-bottom-li-ul-li-img">
                          <img :src="tmpA.icos[tmpA.isSucess?1:0]" alt />
                        </div>
                        <div
                          :class="['msg-bottom-li-ul-li-bt',tmpA.isSucess?'actived':'']"
                        >{{tmpA.title}}</div>
                      </div>
                      <div class="msg-bottom-li-ul-li-right" v-if="i!==process1.length-1">
                        <i v-for="tmpB in 4" :key="tmpB" :class="{'actived':tmpA.isSucess}"></i>
                      </div>
                    </div>
                    <div
                      class="msg-bottom-li-ul-li-note"
                      v-show="tmpA.date"
                    >({{tmpA.name?tmpA.name+" ":""}}{{tmpA.date}})</div>
                  </li>
                </ul>
              </li>
              <li class="msg-bottom-li">
                <div class="msg-bottom-cate">
                  <i></i>刻章办理进度
                </div>
                <ul class="msg-bottom-li-ul">
                  <li v-for="(tmpA,i) in process2" :key="i" @click="jump(i,tmpA.isSucess,tmpA.url)">
                    <div class="msg-bottom-li-ul-li-cont">
                      <div class="msg-bottom-li-ul-li-left">
                        <div class="msg-bottom-li-ul-li-img">
                          <img :src="tmpA.icos[tmpA.isSucess?1:0]" alt />
                        </div>
                        <div
                          :class="['msg-bottom-li-ul-li-bt',tmpA.isSucess?'actived':'']"
                        >{{tmpA.title}}</div>
                      </div>
                      <div class="msg-bottom-li-ul-li-right" v-if="i!==process2.length-1">
                        <i v-for="tmpB in 4" :key="tmpB" :class="{'actived':tmpA.isSucess}"></i>
                      </div>
                    </div>
                    <div
                      class="msg-bottom-li-ul-li-note"
                      v-show="tmpA.date"
                    >({{tmpA.name?tmpA.name+" ":""}}{{tmpA.date}})</div>
                  </li>
                </ul>
              </li>
              <li class="msg-bottom-li">
                <div class="msg-bottom-cate">
                  <i></i>银行业务办理进度
                </div>
                <ul class="msg-bottom-li-ul">
                  <li v-for="(tmpA,i) in process3" :key="i" @click="jump(i,tmpA.isSucess,tmpA.url)">
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
                    >({{tmpA.name?tmpA.name+" ":""}}{{tmpA.date}})</div>
                  </li>
                </ul>
              </li>
              <li class="msg-bottom-li">
                <div class="msg-bottom-cate">
                  <i></i>税务业务办理进度
                </div>
                <ul class="msg-bottom-li-ul">
                  <li v-for="(tmpA,i) in process4" :key="i" @click="jump(i,tmpA.isSucess,tmpA.url)">
                    <div class="msg-bottom-li-ul-li-cont">
                      <div class="msg-bottom-li-ul-li-left">
                        <div class="msg-bottom-li-ul-li-img">
                          <img :src="tmpA.icos[tmpA.isSucess?1:0]" alt />
                        </div>
                        <div
                          :class="['msg-bottom-li-ul-li-bt',tmpA.isSucess?'actived':'']"
                        >{{tmpA.title}}</div>
                      </div>
                      <div class="msg-bottom-li-ul-li-right" v-if="i!==process4.length-1">
                        <i v-for="tmpB in 4" :key="tmpB" :class="{'actived':tmpA.isSucess}"></i>
                      </div>
                    </div>
                    <div
                      class="msg-bottom-li-ul-li-note"
                      v-show="tmpA.date"
                    >({{tmpA.name?tmpA.name+" ":""}}{{tmpA.date}})</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="height10"></div>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import { storage } from "@/api/resource";
//调用接口
import { APIgsdj } from "@/api/index";
export const API = new APIgsdj();
export default {
  name: "gsdjMsg",
  data() {
    return {
      process1: [
        {
          title: "提交申请",
          icos: [
            require("../../assets/images/web/iconU/tjsq.png"),
            require("../../assets/images/web/iconS/tjsq.png")
          ],
          isSucess: true
        },
        {
          title: "完成",
          icos: [
            require("../../assets/images/web/iconU/wc.png"),
            require("../../assets/images/web/iconS/wc.png")
          ],
          isSucess: true
        }
      ],
      process2: [
        {
          title: "下单",
          icos: [
            require("../../assets/images/web/iconU/xd.png"),
            require("../../assets/images/web/iconS/xd.png")
          ],
          url: "blkzList",
          isSucess: false,
          name: "",
          date: ""
        },
        {
          title: "受理",
          icos: [
            require("../../assets/images/web/iconU/sl.png"),
            require("../../assets/images/web/iconS/sl.png")
          ],
          url: "blkzPay",
          isSucess: false,
          name: "",
          date: ""
        },
        {
          title: "支付",
          icos: [
            require("../../assets/images/web/iconU/zf.png"),
            require("../../assets/images/web/iconS/zf.png")
          ],
          url: "blkzPay",
          isSucess: false,
          name: "",
          date: ""
        },
        {
          title: "邮寄",
          icos: [
            require("../../assets/images/web/iconU/yj.png"),
            require("../../assets/images/web/iconS/yj.png")
          ],
          url: "blkzPay",
          isSucess: false,
          name: "",
          date: ""
        },
        {
          title: "签收",
          icos: [
            require("../../assets/images/web/iconU/qs.png"),
            require("../../assets/images/web/iconS/qs.png")
          ],
          url: "blkzPay",
          isSucess: false,
          name: "",
          date: ""
        },
        {
          title: "评价",
          icos: [
            require("../../assets/images/web/iconU/pj.png"),
            require("../../assets/images/web/iconS/pj.png")
          ],
          url: "blkzPay",
          isSucess: false,
          name: "",
          date: ""
        }
      ],
      process3: [
        {
          title: "提交申请",
          icos: [
            require("../../assets/images/web/iconU/tjsq.png"),
            require("../../assets/images/web/iconS/tjsq2.png")
          ],
          url: "yhywList",
          isSucess: false
        },
        {
          title: "审核中",
          icos: [
            require("../../assets/images/web/iconU/shz.png"),
            require("../../assets/images/web/iconS/shz.png")
          ],
          url: "yhywMsg",
          isSucess: false
        },
        {
          title: "产生预账号(完成)",
          icos: [
            require("../../assets/images/web/iconU/csyzh.png"),
            require("../../assets/images/web/iconS/csyzh.png")
          ],
          url: "yhywMsg",
          isSucess: false
        },
        {
          title: "评价",
          icos: [
            require("../../assets/images/web/iconU/pj.png"),
            require("../../assets/images/web/iconS/pj2.png")
          ],
          url: "yhywMsg",
          isSucess: false
        }
      ],
      process4: [
        {
          title: "提交申请",
          icos: [
            require("../../assets/images/web/iconU/tjsq.png"),
            require("../../assets/images/web/iconS/tjsq3.png")
          ],
          url: "swApply",
          isSucess: false
        },
        {
          title: "审核中",
          icos: [
            require("../../assets/images/web/iconU/shz.png"),
            require("../../assets/images/web/iconS/shz2.png")
          ],
          url: "swMsg",
          isSucess: false
        },
        {
          title: "完成",
          icos: [
            require("../../assets/images/web/iconU/wc.png"),
            require("../../assets/images/web/iconS/wc2.png")
          ],
          url: "swMsg",
          isSucess: false
        }
      ],
      msgCorp: {}, //公司信息
      msgShop: {}, //店铺信息
      msgBank: {} //银行信息
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  created() {
    this.msgCorp = storage.get("msgCorp");
    //初始化对应公司办理流程数据
    this.getCorpProcessData();
  },
  methods: {
    //获取对应公司办理流程数据
    getCorpProcessData() {
      API.getCorpProcessData({
        mId: this.msgCorp.mId, //流程id
        Authorization: this.$store.state.token //Token
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            //工商办理进度
            var company = res.data.company;
            if (company) {
              this.process1[0].date = company.slrq ? this.formatDate(company.slrq.replace(/-/g, '/')) :"";
              this.process1[1].date = company.clsj ? this.formatDate(company.clsj.replace(/-/g, '/')) :"";
            }
            //刻章办理进度
            var kz = res.data.kz;
            if (kz) {
              for (var i = 0; i < this.process2.length; i++) {
                if (i < kz.kzOrderStatus && kz.kzOrderStatus) {
                  this.process2[i].isSucess = true;
                } else {
                  this.process2[i].isSucess = false;
                }
              }
              this.process2[0].name = kz.kzActSubmitUserName;
              this.process2[0].date = kz.kzActSubmitDate
                ? this.formatDate(kz.kzActSubmitDate)
                : "";
              this.process2[1].name = kz.kzActAccpetUserName;
              this.process2[1].date = kz.kzActAcceptDate
                ? this.formatDate(kz.kzActAcceptDate)
                : "";
              this.process2[2].name = kz.kzActPayUserName;
              this.process2[2].date = kz.kzActPayDate
                ? this.formatDate(kz.kzActPayDate)
                : "";
              this.process2[3].name = kz.kzActSendUserName;
              this.process2[3].date = kz.kzActSendDate
                ? this.formatDate(kz.kzActSendDate)
                : "";
              this.process2[4].name = kz.kzActReceiveUserName;
              this.process2[4].date = kz.kzActReceiveDate
                ? this.formatDate(kz.kzActReceiveDate)
                : "";
              this.process2[5].name = kz.kzActEvalUserName;
              this.process2[5].date = kz.kzActEvalDate
                ? this.formatDate(kz.kzActEvalDate)
                : "";
            }
            //银行业务办理进度
            var bk = res.data.bk;
            if (bk) {
              for (var j = 0; j < this.process3.length; j++) {
                if (j < bk.bkStatus && bk.bkStatus) {
                  this.process3[j].isSucess = true;
                } else {
                  this.process3[j].isSucess = false;
                }
              }
              this.process3[0].name = bk.bkSubmitName;
              this.process3[0].date = bk.bkSubmitTime
                ? this.formatDate(bk.bkSubmitTime)
                : "";
              this.process3[1].name = bk.bkVerifyName;
              this.process3[1].date = bk.bkVerifyTime
                ? this.formatDate(bk.bkVerifyTime)
                : "";
              this.process3[2].date = bk.bkReservationTime
                ? this.formatDate(bk.bkReservationTime)
                : "";
              this.process3[3].name = bk.bkSubmitName;
              this.process3[3].date = bk.bkTalkDate
                ? this.formatDate(bk.bkTalkDate)
                : "";
            }
            //税务业务办理进度
            var sw = res.data.sw;

            if (sw) {
              for (var k = 0; k < this.process4.length; k++) {
                if (k <= sw.swStatus && sw.swStatus) {
                  this.process4[k].isSucess = true;
                } else {
                  this.process4[k].isSucess = false;
                }
              }
              console.log(sw.swYlOne)
              if (sw.swYlOne) {
                this.process4[0].name = sw.swYlOne.split("/")[0];
                this.process4[0].date = sw.swYlOne.split("/")[1]
                  ? this.formatDate(new Date(sw.swYlOne.split("/")[1].replace(/-/g, '/')).getTime())
                  : "";
              }

              this.process4[2].date = sw.swYlThree
                ? this.formatDate(sw.swYlThree)
                : "";
            }
            //店铺与银行信息
            this.msgShop = res.data.kzCompanyInfo;
            this.msgBank = res.data.baBaseInfo;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转
    jump(i, isSucess, url) {
      if (i === 0 && !isSucess) {
        if (url == "swApply" && !this.process3[1].isSucess) {
          this.$notify({
            title: "警告",
            message: "请先提交申请银行业务！",
            type: "warning"
          });
          return;
        }
        this.$router.push({
          path: url
        });
      } else if (i !== 0 && isSucess) {
        console.log(2);
        this.$router.push({
          path: url
        });
      }
      storage.set("msgShop", this.msgShop);
      storage.set("msgBank", this.msgBank);
    },
    //时间戳转为日期格式
    formatDate(now) {
      //console.log(now)
      //console.log(typeof(now))
      now = new Date(now);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  }
};
</script>
<style lang="less" scoped>
.gsdj-msg {
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
  padding: 1.5rem 0;
  width: 100%;
}
.msg-cont {
  width: 97.25%; //1273
  margin: 0 auto;
}
.msg-top {
  .msg-top-cate {
    color: #333333;
    font-size: 1.4rem;
    i {
      background: #ffa200;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 8px;
    }
  }
  .msg-top-ul {
    padding-left: 16px;
    li {
      font-size: 1.4rem;
      padding: 0.25rem 0;
    }
  }
}
.msg-bottom {
  .msg-cont {
    display: flex;
    .msg-bottom-left {
      width: 4px;
      overflow: hidden;
      background: #cccccc;
      margin-right: 2rem;
      span {
        display: inline-block;
        background: #ffae20;

        width: 100%;
      }
    }
    .msg-bottom-right {
      flex: 1;
      .msg-bottom-ul {
        .msg-bottom-li {
          border-bottom: 1px dashed #d9d9d9;
          padding: 2rem 0;
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
            margin: 1.2rem 0;
            li {
              float: left;
              cursor: pointer;
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
              background: #ffa200;
            }
          }
          .msg-bottom-li-ul {
            li {
              .msg-bottom-li-ul-li-left {
                .msg-bottom-li-ul-li-bt.actived {
                  color: #ffa200;
                }
              }
              .msg-bottom-li-ul-li-right {
                i.actived {
                  background: #ffa200;
                }
              }
            }
          }
        }
        .msg-bottom-li:nth-child(2) {
          .msg-bottom-cate {
            i {
              background: #fe7743;
            }
          }
          .msg-bottom-li-ul {
            li {
              .msg-bottom-li-ul-li-left {
                .msg-bottom-li-ul-li-bt.actived {
                  color: #fe7743;
                }
              }
              .msg-bottom-li-ul-li-right {
                i.actived {
                  background: #fe7743;
                }
              }
            }
          }
        }
        .msg-bottom-li:nth-child(3) {
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
        .msg-bottom-li:nth-child(4) {
          .msg-bottom-cate {
            i {
              background: #1ec6a5;
            }
          }
          .msg-bottom-li-ul {
            li {
              .msg-bottom-li-ul-li-left {
                .msg-bottom-li-ul-li-bt.actived {
                  color: #1ec6a5;
                }
              }
              .msg-bottom-li-ul-li-right {
                i.actived {
                  background: #1ec6a5;
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
  }
}
</style>
