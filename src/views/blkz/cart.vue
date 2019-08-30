<template>
  <div class="blkz-cart" v-loading="fullscreenLoading">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="刻章店铺详情" :isSearch="false" :isHeight="false"></v-Cate>
    <div class="main">
      <div class="cartB cart-bj">
        <div class="cart-cont">
          <ul class="cartB-ul">
            <li class="cartB-li">
              <div class="msg-top-cate">
                <i></i>办理公司
              </div>
              <ul class="msg-top-ul">
                <li>公司名称：{{msgCorp.bkCompanyName?msgCorp.bkCompanyName:msgCorp.mcompanyName}}</li>
                <li>经办人：{{msgCorp.mFrName?msgCorp.mFrName:msgCorp.mfrName}}</li>
                <li>经办人联系电话：{{params.userPhone}}</li>
              </ul>
            </li>
            <li class="cartB-li">
              <div class="msg-top-cate">
                <i></i>刻章店铺
              </div>
              <ul class="msg-top-ul">
                <li>店名：{{msgShop.kzCompanyName}}</li>
                <li>地址：{{msgShop.provinceName+msgShop.cityName+msgShop.areaName+msgShop.kzDzDetail}}</li>
                <li>电话：{{msgShop.kzMobPhone}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="height10"></div>
      <el-form ref="params" :model="params" :rules="rules" label-width="80px">
        <div class="cartC cart-bj">
          <div class="cart-cont">
            <div class="msg-midddle-cate">刻章价格</div>
            <table class="msg-midddle-table" cellspacing="0" cellpadding="0">
              <thead>
                <th>印章类型</th>
                <th>印章材质</th>
                <th>数量</th>
                <th>单价</th>
              </thead>
              <tbody>
                <tr v-for="(tmpA,i) in msgShop.kzChapterInfoList" :key="tmpA.kzChapterId">
                  <td>{{tmpA.kzChapterName}}</td>
                  <td>
                    <el-select
                      v-model="tmpA.value"
                      value-key="kzChapSpecName"
                      size="mini"
                      placeholder="请选择"
                      @change="selectChange(i,$event)"
                    >
                      <el-option
                        v-for="item in tmpA.kzChapterSpecInfoList"
                        :key="item.kzChapSpecId"
                        :label="item.kzChapSpecName"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input-number
                      v-model="tmpA.num"
                      size="mini"
                      :min="0"
                      :max="tmpA.kzChapterName=='公章'?1:tmpA.kzChapterName=='财务章'?1:tmpA.kzChapterName=='法人章'?1:10000"
                      label="描述文字"
                      @change="handleChange(i)"
                    ></el-input-number>
                  </td>
                  <td>￥{{tmpA.price}}</td>
                </tr>
              </tbody>
              <tfoot>
                <th>结算</th>
                <th>--</th>
                <th>{{count}}</th>
                <th>￥{{total}}</th>
              </tfoot>
            </table>
            <div class="height30"></div>
            <ul class="cartC-ul">
              <!-- 开票信息 -->
              <li class="cartC-li">
                <div class="msg-midddle-cate">开票信息</div>
                <div class="cartC-invoice">
                  <el-radio-group v-model="params.kzBillModel">
                    <el-radio-button label="0">不开</el-radio-button>
                    <el-radio-button label="1">开票</el-radio-button>
                  </el-radio-group>
                  <div class="height20"></div>
                  <el-form-item label="抬头类型">
                    <el-select
                      placeholder="请选择抬头类型"
                      v-model="params.kzBillType"
                      :disabled="params.kzBillModel==0"
                    >
                      <el-option label="企业" value="企业"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="发票抬头"
                    :prop="params.kzBillModel==0?'kzBillCompnayName1':'kzBillCompnayName'"
                  >
                    <el-input
                      placeholder="请输入发票抬头"
                      v-model="params.kzBillCompnayName"
                      :disabled="params.kzBillModel==0"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="税号"
                    :prop="params.kzBillModel==0?'kzBillCompanyRegNo1':'kzBillCompanyRegNo'"
                  >
                    <el-input
                      placeholder="请输入纳税人识别号"
                      v-model="params.kzBillCompanyRegNo"
                      :disabled="params.kzBillModel==0"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <!-- 收件方式 -->
              <li class="cartC-li">
                <div class="msg-midddle-cate">收件方式</div>
                <div class="cartC-invoice">
                  <el-radio-group v-model="params.kzReceiveModel">
                    <el-radio-button label="0">自取</el-radio-button>
                    <el-radio-button label="1">邮寄￥{{params.kzSendMoney}}</el-radio-button>
                  </el-radio-group>
                  <div class="height20"></div>
                  <el-form-item
                    label="收件地址"
                    :prop="params.kzReceiveModel==0?'kzReceiveAddr1':'kzReceiveAddr'"
                  >
                    <el-input
                      placeholder="请输入收件地址"
                      v-model="params.kzReceiveAddr"
                      :disabled="params.kzReceiveModel==0"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="收件人"
                    :prop="params.kzReceiveModel==0?'kzReceiveUser1':'kzReceiveUser'"
                  >
                    <el-input
                      placeholder="请输入收件人名字"
                      v-model="params.kzReceiveUser"
                      :disabled="params.kzReceiveModel==0"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="联系电话"
                    :prop="params.kzReceiveModel==0?'kzReceiveMob1':'kzReceiveMob'"
                  >
                    <el-input
                      placeholder="请输入收件人联系电话"
                      v-model="params.kzReceiveMob"
                      :disabled="params.kzReceiveModel==0"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="height10"></div>
        <div class="cartD cart-bj">
          <button class="btn1" type="button" @click="prev">上一步</button>
          <button class="btn2" type="button" @click="next('params')">提交订单</button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入全局变量
import { storage } from "@/api/resource";
//调用接口
import { APIblkz } from "@/api/index";
import { setTimeout } from "timers";
export const API = new APIblkz();
export default {
  name: "blkzCart",
  data() {
    var checkRegNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入税号"));
      } else {
        if (value.length === 15 || value.length === 18) {
          var addressCode = value.substring(0, 6);
          // 校验地址码
          var check = this.checkAddressCode(addressCode);
          if (!check) {
            return callback(new Error("请输入正确的纳税人识别号"));
          }
          // 校验组织机构代码
          var orgCode = value.substring(6, 9);
          check = this.isValidOrgCode(orgCode);
          if (!check) {
            return callback(new Error("请输入正确的纳税人识别号"));
          }
          callback();
        } else {
          return callback(new Error("请输入正确的纳税人识别号"));
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入收件人电话"));
      } else {
        const reg = /^1[3456789]\d{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      msgCorp: {},
      msgShop: {},

      rules: {
        kzBillCompnayName: [
          { required: true, message: "请输入发票抬头", trigger: "blur" }
        ],
        kzBillCompanyRegNo: [
          { required: true, validator: checkRegNo, trigger: "blur" }
        ],
        kzReceiveAddr: [
          { required: true, message: "请输入收件地址", trigger: "blur" }
        ],
        kzReceiveUser: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" }
        ],
        kzReceiveMob: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ]
      },
      ruleLength: 0,
      params: {
        corpName: "", //提交订单公司名称
        kzCompanyId: "", //店铺id
        kzMId: "", //刻章订单主键
        kzReceiveModel: 0, //刻章收货模式（0:自取 1：快递）
        kzZMoney: "", //刻章单价
        userName: "", //提交订单人姓名
        userSfCode: "", //提交订单人身份证号
        userPhone: "", //提交订单人手机号
        Authorization: "", //Token
        kzBillModel: 0, //刻章发票模式（0:不开 1：开票）
        kzBillType: "企业", //抬头类型
        kzBillCompanyRegNo: "", //税号
        kzBillCompnayName: "", //票据抬头
        kzOrderDetailInfo: [], //JSON集合:字段包含kzChapSpecId：材质id+kzDGzCount 数量
        kzReceiveAddr: "", //刻章订单收件地址
        kzReceiveMob: "", //刻章订单收件人电话
        kzReceiveUser: "", //刻章订单收件人姓名
        kzSendMoney: 10 //刻章邮寄费用
      },
      fullscreenLoading: false //loading
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  created() {
    //办理公司
    this.msgCorp = storage.get("msgCorp");
    //刻章店铺
    var msgShop = storage.get("msgShop");
    //console.log(msgShop.kzChapterInfoList)
    for (var tmp of msgShop.kzChapterInfoList) {
      tmp.value = tmp.kzChapterSpecInfoList[0].kzChapSpecName;
      tmp.num = 0;
      tmp.price = tmp.kzChapterSpecInfoList[0].kzChapSpecPrice;
      tmp.kzChapSpecId = tmp.kzChapterSpecInfoList[0].kzChapSpecId;
    }
    this.msgShop = msgShop;
    this.params.corpName = this.msgCorp.mcompanyName?this.msgCorp.mcompanyName:this.msgCorp.mCompanyName;
    this.params.kzCompanyId = this.msgShop.kzCompanyId;
    this.params.kzMId = this.msgCorp.kzMId
      ? this.msgCorp.kzMId
      : this.msgCorp.kzOrderMainInfo.kzMId;

    this.params.userName = this.$store.state.userName;
    this.params.userSfCode = this.$store.state.sfCode;
    this.params.userPhone = this.$store.state.phone;
    this.params.Authorization = this.$store.state.token;
  },
  watch: {
    "params.kzBillModel": function(val) {
      if (val == 0) {
        this.$refs.params.clearValidate([
          "kzBillCompnayName",
          "kzBillCompanyRegNo"
        ]);
        this.params.kzBillCompnayName = "";
        this.params.kzBillCompanyRegNo = "";
      }
    },
    "params.kzReceiveModel": function(val) {
      if (val == 0) {
        this.$refs.params.clearValidate([
          "kzReceiveAddr",
          "kzReceiveUser",
          "kzReceiveMob"
        ]);
        this.params.kzReceiveAddr = "";
        this.params.kzReceiveUser = "";
        this.params.kzReceiveMob = "";
      }
    }
  },
  computed: {
    count: function() {
      var cont = 0;
      for (var tmp of this.msgShop.kzChapterInfoList) {
        cont += tmp.num;
      }
      return cont;
    },
    total: function() {
      var total = 0;
      for (var tmp of this.msgShop.kzChapterInfoList) {
        total += tmp.num * tmp.price;
      }
      return total;
    }
  },
  methods: {
    // 校验组织机构代码
    isValidOrgCode(value) {
      if (value != "") {
        var part1 = value.substring(0, 8);
        var part2 = value.substring(value.length - 1, 1);
        var ws = [3, 7, 9, 10, 5, 8, 4, 2];
        var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var reg = /^([0-9A-Z]){8}$/;
        if (!reg.test(part1)) {
          return true;
        }
        var sum = 0;
        for (var i = 0; i < 8; i++) {
          sum += str.indexOf(part1.charAt(i)) * ws[i];
        }
        var C9 = 11 - (sum % 11);
        var YC9 = part2 + "";
        if (C9 == 11) {
          C9 = "0";
        } else if (C9 == 10) {
          C9 = "X";
        } else {
          C9 = C9 + "";
        }
        return YC9 != C9;
      }
    }, 
    // 校验地址码
    checkAddressCode(addressCode) {
      var provinceAndCitys = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      var check = /^[1-9]\d{5}$/.test(addressCode);
      if (!check) return false;
      if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
        return true;
      } else {
        return false;
      }
    },

    //选择印章材质
    selectChange(i, obj) {
      // console.log(obj);
      this.msgShop.kzChapterInfoList[i].price = obj.kzChapSpecPrice;
      this.msgShop.kzChapterInfoList[i].kzChapSpecId = obj.kzChapSpecId;
    },
    //校验章数量
    handleChange(i) {
      this.msgShop.kzChapterInfoList[i];
      console.log(this.msgShop.kzChapterInfoList[i]);
    },
    //上一步
    prev() {
      this.$router.go(-1);
    },
    //提交订单
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          //console.log("error submit!!");
          return false;
        }
      });

      // this.ruleLength = 0;
      // if (this.params.kzBillModel == 1) {
      //   this.$refs[formName].validateField(
      //     ["kzBillCompnayName", "kzBillCompanyRegNo"],
      //     valid => {
      //       if (!valid) {
      //         this.ruleLength += 1;
      //       }
      //     }
      //   );
      // }
      // if (this.params.kzReceiveModel == 1) {
      //   this.$refs[formName].validateField(
      //     ["kzReceiveAddr", "kzReceiveUser", "kzReceiveMob"],
      //     valid => {
      //       if (!valid) {
      //         this.ruleLength += 1;
      //       }
      //     }
      //   );
      // }
      // if (
      //   this.ruleLength == 0 &&
      //   this.params.kzBillModel == 0 &&
      //   this.params.kzReceiveModel == 0
      // ) {
      //   //不开发票且自取
      //   this.submit();
      // } else if (
      //   this.ruleLength == 2 &&
      //   this.params.kzBillModel == 1 &&
      //   this.params.kzReceiveModel == 0
      // ) {
      //   //开发票且自取
      //   this.submit();
      // } else if (
      //   this.ruleLength == 3 &&
      //   this.params.kzBillModel == 0 &&
      //   this.params.kzReceiveModel == 1
      // ) {
      //   //不开发票且邮寄
      //   this.submit();
      // } else if (
      //   this.ruleLength == 5 &&
      //   this.params.kzBillModel == 1 &&
      //   this.params.kzReceiveModel == 1
      // ) {
      //   //开发票且邮寄
      //   this.submit();
      // }
    },
    //保存刻章订单
    submit() {
      if (this.count == 0) {
        this.$notify({
          title: "警告",
          message: "刻章总数不能为空！",
          type: "warning"
        });
        return;
      }
      this.fullscreenLoading = true;
      var kzOrderDetailInfo = [];
      //console.log(this.msgShop.kzChapterInfoList)
      for (var tmp of this.msgShop.kzChapterInfoList) {
        if (tmp.num > 0) {
          var obj = new Object();
          obj.kzChapSpecId = tmp.kzChapSpecId;
          obj.kzDGzCount = tmp.num;
          obj.kzChapterType = tmp.kzChapterType;
          kzOrderDetailInfo.push(obj);
        }
      }
      this.params.kzOrderDetailInfo = JSON.stringify(kzOrderDetailInfo);
      this.params.kzZMoney = this.total;
      this.params.kzSendMoney = this.params.kzReceiveModel == "1" ? 10 : 0;
      //console.log(this.params)
      API.saveKzOrder(this.params)
        .then(res => {
          console.log(res);
          this.fullscreenLoading = false;
          if (res.code === 0) {
            this.$notify({
              title: "提示",
              message: "订单提交成功", //账户申请提交成功//提交成功
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({
                path: "blkzPay"
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
    }
  }
};
</script>
<style lang="less" scoped>
.blkz-cart {
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
.cart-bj {
  background: #ffffff;
  box-shadow: 1px 0 16px #bebebe;
  border-radius: 5px;
  width: 100%;
}
.cart-cont {
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

    .msg-bottom-li:last-child {
      border: 0;
    }
    .msg-bottom-li:first-child {
      padding-top: 0;
    }
  }
}

.cartB {
  padding: 1rem 0;
  .cartB-ul {
    .cartB-li {
      float: left;
      margin-right: 28.28%;
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
    .cartB-li:nth-child(2) {
      margin-right: 0;
      i {
        background: #1ec6a5;
      }
    }
  }
  .cartB-ul:after {
    display: block;
    content: "clear";
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
}

.cartC {
  padding: 1.8rem 0;
  .msg-midddle-cate {
    color: #333333;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
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
          width: 25%;
        }
        td:nth-child(2) {
          .el-select {
            width: 6.12%;
            min-width: 100px;
          }
        }
        td:nth-child(3) {
          .el-input-number {
            width: 6.12%;
            min-width: 90px;
          }
        }
      }
      tr:last-child {
        td {
          border-bottom: none;
        }
      }
    }
    tfoot {
      background: #f2f2f2;
      th {
        line-height: 4.5rem;
        font-weight: normal;
      }
      th:first-child {
        font-weight: bold;
      }
      th:last-child {
        color: #ff3e3e;
      }
    }
  }
  .cartC-ul {
    .cartC-li {
      float: left;
      margin-right: 22.2%;
      .cartC-invoice {
        .el-select {
          width: 100%;
        }
        .el-input {
          width: 100%;
        }
      }
    }
    .cartC-li:last-child {
      margin-right: 0;
    }
  }
  .cartC-ul::after {
    display: block;
    content: "clear";
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
}
.cartD {
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
.blkz-cart {
  tbody {
    td:nth-child(2) {
      .el-input__inner {
        border: 0;
      }
    }
  }
}
.el-radio-button__inner {
  background: #f5f5f5;
  color: #999999;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #ffbe4d;
}
.el-radio-button:first-child .el-radio-button__inner {
  border: 0;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: 0 0 0 0 #409eff;
}

.el-radio-button__inner {
  border: 0;
}
.el-radio-button__inner:hover {
  color: #999999;
}
</style>
