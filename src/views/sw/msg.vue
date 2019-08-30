<template>
  <div class="yhyw-msg">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="填写税务申请" :isSearch="false" :isHeight="false"></v-Cate>
    <div class="main">
      <div class="cartA yhyw-bj">
        <div class="yhyw-cont">
          <ul class="msg-bottom-ul">
            <li class="msg-bottom-li">
              <div class="msg-bottom-cate">
                <i></i>税务业务办理进度
              </div>
              <ul class="msg-bottom-li-ul">
                <li v-for="(tmpA,i) in process4" :key="i">
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
                  >({{tmpA.name}} {{tmpA.date}})</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="height10"></div>
      <el-form ref="form" label-width="120px">
        <ul class="apply-ul">
          <li class="apply-li">
            <div class="msg-middle yhyw-bj">
              <div class="yhyw-cont">
                <ul class="msg-middle-ul">
                  <li class="msg-middle-li">
                    <div class="msg-bottom-cate">
                      <i></i>基本信息
                    </div>
                    <ul class="msg-middle-li-ul">
                      <li>公司名称：{{msgCorp.bkCompanyName?msgCorp.bkCompanyName:msgCorp.mcompanyName}}</li>
                      <li>纳税人识别号：{{msgCorp.bkCompanyRegNo?msgCorp.bkCompanyRegNo:msgCorp.mcompanyRegNo}}</li>
                      <li>注册地址：{{msgCorp.mCompanyAddr?msgCorp.mCompanyAddr:msgCorp.mcompanyAddr}}</li>
                      <li v-if="false">从业人数：30</li>
                      <li v-if="false">设立日期：2017-10-11</li>
                      <li v-if="false">经营范围：计算机软件</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="height10"></div>
          </li>
          <li class="apply-li">
            <div class="msg-middle yhyw-bj">
              <div class="yhyw-cont">
                <ul class="msg-middle-ul">
                  <li class="msg-middle-li">
                    <div class="msg-bottom-cate">
                      <i></i>相关人信息
                    </div>
                    <div class="msg-bottom-bt">a.法人</div>
                    <ul class="msg-middle-li-ul">
                      <li>姓名：{{mainInfo.mfrName}}</li>
                      <li>证件号：{{mainInfo.mfrZjCode}}</li>
                      <li>联系电话：{{phone}}</li>
                    </ul>
                    <div class="msg-bottom-bt" v-if="false">b.财务负责人</div>
                    <ul class="msg-middle-li-ul" v-if="false">
                      <li>姓名：张三</li>
                      <li>证件号：411654567654567656</li>
                      <li>联系电话：15267676543</li>
                    </ul>
                    <div class="msg-bottom-bt">b.股东</div>
                    <ul class="msg-middle-li-ul" v-for="(tmp,i) in gdInfo" :key="i">
                      <li>姓名：{{tmp.gdmc}}</li>
                      <li>证件号：{{tmp.gdzjhm}}</li>
                      <li v-if="false">持股比例：{{tmp.cze}}</li>
                      <li v-if="false">住址：南京市浦口区</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="height10"></div>
          </li>
          <li class="apply-li">
            <div class="msg-middle yhyw-bj">
              <div class="yhyw-cont">
                <ul class="msg-middle-ul">
                  <li class="msg-middle-li">
                    <div class="msg-bottom-cate">
                      <i></i>纳税人存款账户账号报告表
                    </div>
                    <ul class="msg-middle-li-ul">
                      <li>账户性质：一般存款账户</li>
                      <li>银行行别：{{ swMainInfo.dictName }}</li>
                      <li>账户名称：{{ msgCorp.bkCompanyName ? msgCorp.bkCompanyName : msgCorp.mcompanyName }}</li>
                      <li>开户日期：{{ swMainInfo.createTime }}</li>
                      <li>币种：人民币</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="height10"></div>
          </li>
          <li class="apply-li" v-if="false">
            <div class="msg-middle yhyw-bj">
              <div class="yhyw-cont">
                <ul class="msg-middle-ul">
                  <li class="msg-middle-li">
                    <div class="msg-bottom-cate">
                      <i></i>
                      税务办理审核通知书
                    </div>
                    <ul class="msg-middle-li-ul2">
                      <li v-for="(tmp, i) in swMainInfo.swInfoDetialList" :key="tmp.swDId">
                        {{ i + 1 }}.{{ tmp.wsmc }}
                        <img src="../../assets/images/web/sw-tp1.png" alt />
                        <span @click="download()">下载</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="height10"></div>
          </li>
        </ul>
      </el-form>
      <div class="height20"></div>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import { storage, swDownloadUrl } from "@/api/resource";
//调用接口
import { APIsw } from "@/api/index";
export const API = new APIsw();
export default {
  name: "swMsg",
  data() {
    return {
      process4: [
        {
          title: "提交申请",
          icos: [
            require("../../assets/images/web/iconU/tjsq.png"),
            require("../../assets/images/web/iconS/tjsq3.png")
          ],
          isSucess: true
        },
        {
          title: "审核中",
          icos: [
            require("../../assets/images/web/iconU/shz.png"),
            require("../../assets/images/web/iconS/shz2.png")
          ],
          isSucess: true
        },
        {
          title: "完成",
          icos: [
            require("../../assets/images/web/iconU/wc.png"),
            require("../../assets/images/web/iconS/wc2.png")
          ],
          isSucess: false
        }
      ],

      isShow: false,
      msgCorp: {}, //公司信息
      params: {
        swMId: "", //税务主表主键
        Authorization: "" //Token
      },
      gdInfo: [], //股东
      swMainInfo: {}, //相关信息
      mainInfo: {},
      steps: "" //税务业务办理进度
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  created() {
    this.init();
  },
  computed: {
    phone() {
      return this.$store.state.phone;
    }
  },
  watch: {
    steps: function(val) {
      for (var i = 0; i < this.process4.length; i++) {
        if (i <= val) {
          this.process4[i].isSucess = true;
        } else {
          this.process4[i].isSucess = false;
        }
      }
    },
    $route() {
      this.init();
    }
  },
  methods: {
    //初始化
    init() {
      //公司信息
      this.msgCorp = storage.get("msgCorp");
      //初始化参数
      this.params.swMId = this.msgCorp.swMId
        ? this.msgCorp.swMId
        : this.msgCorp.swMainInfo.swMId;
      this.params.Authorization = this.$store.state.token;
      //初始化单个公司税务相关所有数据
      this.getSwDataAllBySwMId();
    },
    //获取单个公司税务相关所有数据
    getSwDataAllBySwMId() {
      API.getSwDataAllBySwMId({
        swMId: this.params.swMId,
        Authorization: this.params.Authorization
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            for (var tmp of res.data.gdInfo) {
              //console.log(tmp.cze)
              var companyCapi = this.msgCorp.bkCompanyCapi
                ? this.msgCorp.bkCompanyCapi
                : this.msgCorp.mcompanyCapi;
              tmp.cze = (tmp.cze / companyCapi) * 100 + "%";
            }
            this.gdInfo = res.data.gdInfo;
            this.swMainInfo = res.data.swMainInfo;
            this.mainInfo = res.data.swMainInfo.mainInfo;
            this.swMainInfo.createTime = this.formatDate(
              this.swMainInfo.createTime
            );
            this.process4[0].name = this.swMainInfo.swYlOne.split("/")[0];
            this.process4[0].date = this.swMainInfo.swYlOne.split("/")[1]
              ? this.formatDate(this.swMainInfo.swYlOne.split("/")[1])
              : "";

            this.process4[2].date = this.swMainInfo.swYlThree
              ? this.formatDate(this.swMainInfo.swYlThree)
              : "";
            //当前刻章办理进度
            this.steps = this.swMainInfo.swStatus;
            //console.log(this.gdInfo);
            //console.log(this.swMainInfo);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //下载
    download() {
      window.location.href = swDownloadUrl;
    },
    //时间戳转为日期格式
    formatDate(now) {
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
      return year + "-" + month + "-" + date;
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
      margin-right: 1.2rem;
      height: 10.1rem;
      img {
        height: 100%;
      }
    }
    .msg-top-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 1.2rem;
      }
      .msg-top-xia {
        display: flex;
        justify-content: space-between;
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
.apply-ul {
  .apply-li:nth-child(1) {
    i {
      background: #3faff0;
    }
  }
  .apply-li:nth-child(2) {
    i {
      background: #ffa200;
    }
  }
  .apply-li:nth-child(3) {
    i {
      background: #1ec6a5;
    }
  }
  .apply-li:nth-child(4) {
    i {
      background: #ffa200;
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
          width: 25%; //446
          margin-bottom: 1rem;
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
      .msg-middle-li-ul2 {
        padding-left: 16px;
        box-sizing: border-box;
        li {
          color: #333333;
          font-size: 1.4rem;
          padding-bottom: 1rem;
          float: left;
          margin-right: 13%;
          img {
            width: 1.5rem;
            height: 1.3rem;
            margin-left: 2rem;
          }
          span {
            color: #ffa200;
            font-size: 1.2rem;
          }
        }
        li:last-child {
          padding: 0;
        }
      }
      .msg-middle-li-ul2:after {
        display: block;
        content: "clear";
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
}
.cartG {
  .el-radio-group {
    width: 100%;
    label {
      width: 50%;
    }
  }

  .cartG-img {
    width: 28.57%;
    margin: 0 auto;
  }

  .cartG-note {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: 1.4rem;
    color: #999999;
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
.el-input--prefix .el-input__inner {
  padding-right: 0;
}
.el-dialog__title {
  font-size: 1.4rem;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  padding: 0;
}
.cartG {
  .el-dialog__header {
    border-bottom: 1px solid #f2f2f2;
    height: 4.5rem;
    line-height: 4.5rem;
    padding-left: 1.5rem;
  }
}

.el-dialog__headerbtn {
  position: absolute;
  top: 1.45rem;
  right: 1.5rem;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 1.6rem;
}
</style>
