<template>
  <div class="yhyw-msg" v-loading="fullscreenLoading">
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
      <el-form :model="params" :rules="rules" ref="params" label-width="125px">
        <div class="msg-middle yhyw-bj">
          <div class="yhyw-cont">
            <ul class="msg-middle-ul">
              <li class="msg-middle-li">
                <div class="msg-bottom-cate">
                  <i></i>基本信息
                </div>
                <ul class="msg-middle-li-ul">
                  <li>
                    <el-form-item label="开户行">
                      <el-input placeholder :value="msgBank.bkName" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="账号">
                      <el-input placeholder :value="msgCorp.mCompanyName" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="注册资本">
                      <el-input
                        placeholder
                        :value="msgCorp.bkCompanyCapi?msgCorp.bkCompanyCapi:main.mcompanyCapi"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="开户联系人电话" prop="bkMob">
                      <el-input placeholder="请输入开户人联系电话" v-model="params.bkMob"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </li>
              <li class="msg-middle-li">
                <div class="msg-bottom-cate">
                  <i></i>成员信息
                </div>
                <div class="msg-bottom-bt">a.法人</div>
                <ul class="msg-middle-li-ul">
                  <li>
                    <el-form-item label="姓名">
                      <el-input placeholder :value="main.mfrName" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="证件号">
                      <el-input placeholder :value="main.mfrZjCode" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系电话">
                      <el-input placeholder :value="main.mylThree" disabled></el-input>
                    </el-form-item>
                  </li>
                </ul>
                <div class="msg-bottom-bt">b.股东</div>
                <ul class="msg-middle-li-ul" v-for="(tmp,i) of gd" :key="i">
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
                  <li>
                    <el-form-item label="联系电话">
                      <el-input placeholder disabled></el-input>
                    </el-form-item>
                  </li>
                </ul>

                <div class="msg-bottom-bt" v-if="false">c.大额付款联系人</div>
                <ul class="msg-middle-li-ul" v-if="false">
                  <li>
                    <el-form-item label="姓名">
                      <el-input placeholder></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="证件号">
                      <el-input placeholder></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系电话">
                      <el-input placeholder></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="height10"></div>
        <div class="cartF yhyw-bj">
          <button class="btn2" type="button" @click="submit('params')">确认提交</button>
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
  name: "yhywApply",
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
          isSucess: false
        },
        {
          title: "产生预账号(完成)",
          icos: [
            require("../../assets/images/web/iconU/csyzh.png"),
            require("../../assets/images/web/iconS/csyzh.png")
          ],
          isSucess: false
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
      msgCorp: {}, //公司信息
      msgBank: {}, //银行信息
      bk: {},
      gd: [],
      main: {},
      rules: {
        bkMob: [
          { required: true, message: "请输入开户联系人电话", trigger: "blur" }
        ]
      },
      params: {
        bkMId: "", //银行订单Id
        bkBaseMId: "", //银行主键
        bkMob: "", //开户联系人电话
        createUser: "", //创建人
        createUserMob: "", //创建人手机号
        createUserSfCode: "", //创建人身份证号
        Authorization: "" //Token
      },
      fullscreenLoading: false //loading
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  created() {
    //公司信息
    this.msgCorp = storage.get("msgCorp");
    //网点信息
    this.msgBank = storage.get("msgBank");
    //初始化参数
    this.params.bkMId = this.msgCorp.bkMId;
    //this.params.bkMId = "200d018a80e15724f68925b46388293f";
    this.params.bkBaseMId = this.msgBank.bkBaseMId;
    this.params.createUser = this.$store.state.userName;
    this.params.createUserMob = this.$store.state.phone;
    this.params.createUserSfCode = this.$store.state.sfCode;
    this.params.Authorization = this.$store.state.token;
    //初始化单个银行订单流程数据复制
    this.getBkOrderDetail();
  },
  methods: {
    //获取单个银行订单流程数据
    getBkOrderDetail() {
      API.getBkOrderDetail({
        bkMId: this.params.bkMId,
        Authorization: this.params.Authorization
      })
        .then(res => {
          console.log(res.data);
          if (res.code === 0) {
            this.bk = res.data.bk;
            this.gd = res.data.gd;
            this.main = res.data.main;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上一步
    prev() {
      this.$router.go(-1);
    },
    //提交
    submit(formName) {
      //console.log(this.params);

      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.fullscreenLoading = true;
          API.saveBankOrder(this.params)
            .then(res => {
              console.log(res);
              this.fullscreenLoading = false;
              if (res.code === 0) {
                if (res.data.code == 1) {
                  this.$notify.error({
                    title: "提示",
                    message: res.data.error
                  });
                  return;
                } else {
                  this.$notify({
                    title: "提示",
                    message: "账户申请提交成功",
                    type: "success"
                  });
                  setTimeout(() => {
                    this.$router.push({
                      path: "yhywMsg"
                    });
                  }, 1500);
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
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
      img {
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
        li {
          float: left;
          // width: 50%; //446
          margin-right: 8%;
          .el-input {
            width: 100%;
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
    .msg-middle-li:nth-child(1) {
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

