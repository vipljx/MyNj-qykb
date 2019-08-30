<template>
  <div class="yhyw-msg" v-loading="fullscreenLoading">
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
                      <li>
                        <el-form-item label="公司名称">
                          <el-input
                            placeholder
                            :value="msgCorp.bkCompanyName?msgCorp.bkCompanyName:msgCorp.mcompanyName"
                            disabled
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="纳税人识别号">
                          <el-input
                            placeholder
                            :value="msgCorp.bkCompanyRegNo?msgCorp.bkCompanyRegNo:msgCorp.mcompanyRegNo"
                            disabled
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="注册地址">
                          <el-input
                            placeholder="请输入注册地址"
                            :value="msgCorp.mCompanyAddr?msgCorp.mCompanyAddr:msgCorp.mcompanyAddr"
                            disabled
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li v-if="false">
                        <el-form-item label="从业人数">
                          <el-input placeholder="请输入从业人数"></el-input>
                        </el-form-item>
                      </li>
                      <li v-if="false">
                        <el-form-item label="设立日期">
                          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                      </li>
                      <li v-if="false">
                        <el-form-item label="经营范围">
                          <el-input placeholder="请输入经营范围"></el-input>
                        </el-form-item>
                      </li>
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
                      <li>
                        <el-form-item label="姓名">
                          <el-input placeholder :value="mainInfo.mfrName" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="证件号">
                          <el-input placeholder :value="mainInfo.mfrZjCode" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="联系电话">
                          <el-input placeholder="" :value="phone" disabled></el-input>
                        </el-form-item>
                      </li>
                    </ul>
                    <div class="msg-bottom-bt" v-if="false">b.财务负责人</div>
                    <ul class="msg-middle-li-ul" v-if="false">
                      <li>
                        <el-form-item label="姓名">
                          <el-input placeholder="请输入法人姓名"></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="证件号">
                          <el-input placeholder="请输入法人证件号"></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="联系电话">
                          <el-input placeholder="请输入法人联系电话"></el-input>
                        </el-form-item>
                      </li>
                    </ul>
                    <div class="msg-bottom-bt">b.股东</div>
                    <ul class="msg-middle-li-ul" v-for="(tmp,i) in gdInfo" :key="i">
                      <li>
                        <el-form-item label="姓名">
                          <el-input placeholder :value="tmp.gdmc" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="证件号">
                          <el-input placeholder :value="tmp.gdzjhm" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li v-if="false">
                        <el-form-item label="持股比例">
                          <el-input placeholder="请输入股东持股比例" :value="tmp.cze" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li v-if="false">
                        <el-form-item label="住址">
                          <el-input placeholder></el-input>
                        </el-form-item>
                      </li>
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
                      <li>
                        <el-form-item label="账户性质">
                          <el-input placeholder value="一般存储账户" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="银行行别">
                          <el-input placeholder :value="swMainInfo.dictName" disabled></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="账户名称">
                          <el-input
                            placeholder
                            :value="msgCorp.bkCompanyName?msgCorp.bkCompanyName:msgCorp.mcompanyName"
                            disabled
                          ></el-input>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="开户日期">
                          <el-date-picker v-model="value2" type="date" placeholder="选择日期" disabled></el-date-picker>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="币种">
                          <el-select v-model="value" placeholder="请选择币种" disabled>
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="height10"></div>
          </li>
        </ul>

        <div class="cartF yhyw-bj">
          <button class="btn2" type="button" @click="submit">确认提交</button>
        </div>
      </el-form>

      <div class="height20"></div>
    </div>

    <!-- 确认提交弹窗-->
    <div class="cartG">
      <el-dialog title="温馨提示" :visible.sync="isShow1" width="41%" @close="onClose">
        <div class="height30"></div>

        <div class="cartG-img">
          <div id="qrcode"></div>
        </div>
        <div class="height30"></div>

        <div class="cartG-note">请使用我的南京APP扫码进行税务信息采集，以完成办理税务相关业务。</div>
        <div class="height30"></div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import { storage, swWechatUrl } from "@/api/resource";
//引入qrcodejs2
import QRCode from "qrcodejs2";
//调用接口
import { APIsw } from "@/api/index";
export const API = new APIsw();
export default {
  name: "swApply",
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
          isSucess: false
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
      options: [
        {
          value: "选项1",
          label: "人民币"
        }
      ],
      value: "人民币", //币种
      value1: "", //设立日期
      value2: "", //开户日期
      isShow1: false,
      msgCorp: {}, //公司信息
      params: {
        swMId: "", //税务主表主键
        bkMId: "", //税务公司主键
        Authorization: "" //Token
      },
      gdInfo: [], //股东
      swMainInfo: {}, //相关信息
      mainInfo: {},
      steps: "", //税务业务办理进度
      fullscreenLoading: false //loading
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
    phone(){
      return this.$store.state.phone
    }
  },
  watch: {
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
      this.params.bkMId = this.msgCorp.bkMId
        ? this.msgCorp.bkMId
        : this.msgCorp.swMainInfo.bkMId;
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
              //console.log(tmp.cze/this.msgCorp.bkCompanyCapi)
              var companyCapi = this.msgCorp.bkCompanyCapi
                ? this.msgCorp.bkCompanyCapi
                : this.msgCorp.mcompanyCapi;
              tmp.cze = (tmp.cze / companyCapi) * 100 + "%";
            }
            this.gdInfo = res.data.gdInfo;
            this.swMainInfo = res.data.swMainInfo;
            this.mainInfo = res.data.swMainInfo.mainInfo;
            this.value2 = this.swMainInfo.createTime;
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

    submit() {
      this.fullscreenLoading = true;
      API.swApi_save({
        bkMId: this.params.bkMId,
        swMId: this.params.swMId,
        Authorization: this.params.Authorization
      })
        .then(res => {
          console.log(res);
          this.fullscreenLoading = false;
          if (res.code === 0) {
            this.$notify({
              title: "提示",
              message: "提交成功",
              type: "success"
            });
            this.getSwDataAllBySwMId();
            setTimeout(() => {
              this.isShow1 = true;
              this.$nextTick(() => {
                var url = swWechatUrl + res.data + "&v=1&met=&ts=&uid=&in=";
                this.qrcode(url);
              });
            }, 1500);
          } else if (res.code === 1) {
            this.$notify.error({
              title: "提示",
              message: res.msg
            });
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //生成二维码
    qrcode(url) {
      new QRCode("qrcode", {
        width: 132,
        height: 132,
        text: url, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    //弹出框关闭
    onClose() {
      this.$router.push({
        path: "gsdjList"
      });
    },
    //上一步
    prev() {
      this.$router.go(-1);
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
          width: 11.538%;
          margin-right: 0.5rem;
        }
        .msg-top-sales {
          width: 50%;
        }
        .msg-top-goods {
          width: 50%;
          text-align: right;
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
        li {
          float: left;
          // width: 50%; //446
          margin-right: 9%;
          .el-input {
            width: 100%;
          }
          .el-select {
            width: 93%;
          }
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


