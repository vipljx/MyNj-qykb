<template>
  <div class="blkz-cart">
    <v-Header :isLine="false"></v-Header>
    <v-Cate name="刻章店铺详情" :isSearch="false" :isHeight="false"></v-Cate>
    <div class="main">
      <div class="cartA cart-bj">
        <div class="cart-cont">
          <ul class="msg-bottom-ul">
            <li class="msg-bottom-li">
              <div class="msg-bottom-cate">
                <i></i>刻章办理进度
              </div>
              <ul class="msg-bottom-li-ul">
                <li v-for="(tmpA,i) in process2" :key="i">
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
                  >({{tmpA.name}} {{tmpA.date}})</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="height10"></div>
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
                <li>经办人联系电话：暂无</li>
              </ul>
            </li>
            <li class="cartB-li">
              <div class="height10"></div>
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
      <div class="cartC cart-bj">
        <el-form ref="form" label-width="78px">
          <div class="cart-cont">
            <div class="msg-midddle-cate">订单详情</div>
            <table class="msg-midddle-table" cellspacing="0" cellpadding="0">
              <thead>
                <th>印章类型</th>
                <th>印章材质</th>
                <th>数量</th>
                <th>金额</th>
              </thead>
              <tbody>
                <tr v-for="tmp in orderMainInfo.kzOrderMainDetailList" :key="tmp.kzChapterId">
                  <td>{{tmp.kzChapterInfo.kzCYlOne}}</td>
                  <td>{{tmp.kzChapterSpecInfo.kzChapSpecName}}</td>
                  <td>{{tmp.kzDGzCount}}</td>
                  <td>￥{{tmp.kzChapterSpecInfo.kzChapSpecPrice}}</td>
                </tr>
                <tr>
                  <td>结算</td>
                  <td>--</td>
                  <td>{{count}}</td>
                  <td>
                    <div :class="{red:true}">￥{{orderMainInfo.kzZMoney}}</div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <th>合计</th>
                <th></th>
                <th></th>
                <th v-if="steps==1">
                  <div :class="{red:true}">￥{{total}}</div>
                  (印章费用：￥{{orderMainInfo.kzZMoney}}，邮费：￥{{orderMainInfo.kzSendMoney}}）
                </th>
                <th v-if="steps!=1">
                  <div class="old">订单价：￥{{total}}</div>
                  <div :class="{red:true,new:true}">成交价：￥{{orderMainInfo.kzActAccpetMonNum}}</div>
                  (印章费用：￥{{orderMainInfo.kzZMoney}}，邮费：￥{{orderMainInfo.kzSendMoney}}）
                </th>
              </tfoot>
            </table>
            <div class="height30"></div>
            <ul class="cartC-ul">
              <!-- 开票信息 -->
              <li class="cartC-li">
                <div class="msg-midddle-cate">开票信息</div>
                <div class="cartC-invoice">
                  <el-radio-group v-model="orderMainInfo.kzBillModel">
                    <el-radio-button label="0" :disabled="orderMainInfo.kzBillModel==1">不开</el-radio-button>
                    <el-radio-button label="1" :disabled="orderMainInfo.kzBillModel==0">开票</el-radio-button>
                  </el-radio-group>
                  <div class="height10"></div>
                  <ul class="msg-top-ul">
                    <li>抬头类型：{{orderMainInfo.kzBillModel==0?"暂无":"企业单位"}}</li>
                    <li>发票抬头：{{orderMainInfo.kzBillModel==0?"暂无":orderMainInfo.kzBillCompnayName}}</li>
                    <li>税号：{{orderMainInfo.kzBillModel==0?"暂无":orderMainInfo.kzBillCompanyRegNo}}</li>
                  </ul>
                </div>
              </li>
              <!-- 收件方式 -->
              <li class="cartC-li">
                <div class="msg-midddle-cate">收件方式</div>
                <div class="cartC-invoice">
                  <el-radio-group v-model="orderMainInfo.kzReceiveModel">
                    <el-radio-button label="0" :disabled="orderMainInfo.kzReceiveModel==1">自取</el-radio-button>
                    <el-radio-button label="1" :disabled="orderMainInfo.kzReceiveModel==0">邮寄￥10</el-radio-button>
                  </el-radio-group>
                  <div class="height10"></div>
                  <ul class="msg-top-ul">
                    <li>收件地址：{{orderMainInfo.kzReceiveModel==0?"暂无":orderMainInfo.kzReceiveAddr}}</li>
                    <li>收件人：{{orderMainInfo.kzReceiveModel==0?"暂无":orderMainInfo.kzReceiveUser}}</li>
                    <li>联系电话：{{orderMainInfo.kzReceiveModel==0?"暂无":orderMainInfo.kzReceiveMob}}</li>
                  </ul>
                </div>
              </li>
              <!-- 物流信息 -->
              <li class="cartC-li" v-show="orderMainInfo.kzActSendNum">
                <div class="msg-midddle-cate">物流信息</div>
                <div class="cartC-invoice">
                  <ul class="msg-top-ul">
                    <li>快递公司：{{orderMainInfo.kzActSendKdName}}</li>
                    <li>物流单号：{{orderMainInfo.kzActSendNum}}</li>
                    <li class="orange" @click="logistics">查看物流信息 ></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </el-form>
      </div>
      <!-- <div class="height10"></div>
      <div class="cartD cart-bj">
        <div class="cart-cont">
          <div class="msg-midddle-cate">支付金额</div>
          <ul class="msg-top-ul">
            <li>
              印章费用：
              <span>￥250</span>
            </li>
            <li>
              邮寄费用：
              <span>￥10</span>
            </li>
            <li>
              合计：
              <span>￥260</span>
            </li>
          </ul>
        </div>
      </div>-->
      <div class="height10" v-show="isShow4 || steps==6"></div>
      <div class="cartE cart-bj" v-show="isShow4 || steps==6">
        <div class="cart-cont">
          <div class="msg-midddle-cate">评价</div>

          <el-rate v-model="params2.num" :disabled="steps==6"></el-rate>
          <div class="evaluate" v-show="steps==6">
            <p>{{orderMainInfo.kzActEvalDesc}}</p>
            <div>{{orderMainInfo.kzActEvalDate}}</div>
          </div>
          <div class="height10"></div>
          <el-input
            type="textarea"
            v-model="params2.kzActEvalDesc"
            :rows="3"
            placeholder="快来评价一下吧~"
            v-show="steps!=6"
          ></el-input>
        </div>
      </div>
      <div class="height10" v-if="steps!==1 && steps!==6 && steps!==3"></div>
      <div class="cartF cart-bj" v-if="steps!==1 && steps!==6 && steps!==3">
        <div v-if="steps==2">
          <button class="btn1" @click="prev">上一步</button>
          <button class="btn2" @click="isShow1 = true">立即支付</button>
        </div>

        <button class="btn2" @click="isShow3 = true" v-if="steps==4">确认收货</button>

        <button class="btn2" @click="evaluate" v-if="steps==5 && isHiden3">立即评价</button>
        <div v-if="isHiden4">
          <button class="btn1" @click="cancel">取消</button>
          <button class="btn2" @click="confirm2">确认提交</button>
        </div>
      </div>
      <div class="height20"></div>
    </div>

    <!-- 立即支付弹窗-->
    <div class="cartG">
      <el-dialog :show-close="false" :visible.sync="isShow1" width="30%">
        <el-radio-group v-model="tabPosition">
          <el-radio-button label="0">支付宝</el-radio-button>
          <el-radio-button label="1">微信</el-radio-button>
        </el-radio-group>
        <div class="height20"></div>
        <div class="cartG-title">{{tabPosition==0?"请使用手机支付宝扫码付款":"请使用手机微信扫码付款"}}</div>
        <div class="height10"></div>
        <ul class="cartG-img">
          <li>
            <img :src="tabPosition==0?companyInfo.kzPayImg:companyInfo.kzWechatImg" alt />
          </li>
          <li v-if="isShow5">
            <img :src="imageUrl" alt />
          </li>
        </ul>
        <div class="clear"></div>
        <div class="height10"></div>
        <div class="cartG-btn">
          <el-upload
            class="upload-demo"
            :action="url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <button>上传凭证</button>
          </el-upload>
          <div v-if="isShow5">
            <button @click="sure">确定</button>
          </div>
        </div>
        <div class="height10"></div>
        <div class="cartG-note">付款成功后，请将付款成功界面截图上传至本系统</div>
        <div class="height20"></div>
      </el-dialog>
    </div>

    <!-- 物流信息弹窗 560px -->
    <div class="cartH">
      <el-dialog title="物流信息" :visible.sync="isShow2" width="41%">
        <table cellspacing="0" cellpadding="0" class="cartH-table">
          <thead>
            <th>快递公司：{{orderMainInfo.kzActSendKdName}}</th>
            <th></th>
            <th>订单编号：{{orderMainInfo.kzActSendNum}}</th>
          </thead>
          <tbody>
            <tr v-for="(tmp,i) in LogisticsList" :key="i">
              <td>{{tmp.AcceptTime}}</td>
              <td>
                <i></i>
                <div class="line" v-if="i!=LogisticsList.length-1"></div>
              </td>
              <td>{{tmp.AcceptStation}}</td>
            </tr>
          </tbody>
        </table>
      </el-dialog>
    </div>

    <!-- 确认收货弹窗 -->
    <div class="cartI">
      <el-dialog title="提示" :visible.sync="isShow3" width="30%">
        <span>您是否已确认收到实体印章?</span>
        <span slot="footer" class="dialog-footer">
          <button class="btn1" @click="isShow3 = false">取 消</button>
          <button class="btn2" @click="confirm1">确 认</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import header from "_c/header";
import cate from "_c/cate";
//引入config
import config from "@/api/config";
//引入全局变量
import { storage } from "@/api/resource";
//调用接口
import { APIblkz } from "@/api/index";
export const API = new APIblkz();

export default {
  name: "blkzPay",
  data() {
    return {
      process2: [
        {
          title: "下单",
          icos: [
            require("../../assets/images/web/iconU/xd.png"),
            require("../../assets/images/web/iconS/xd.png")
          ],
          isSucess: true
        },
        {
          title: "受理",
          icos: [
            require("../../assets/images/web/iconU/sl.png"),
            require("../../assets/images/web/iconS/sl.png")
          ],
          isSucess: false
        },
        {
          title: "支付",
          icos: [
            require("../../assets/images/web/iconU/zf.png"),
            require("../../assets/images/web/iconS/zf.png")
          ],
          isSucess: false
        },
        {
          title: "邮寄",
          icos: [
            require("../../assets/images/web/iconU/yj.png"),
            require("../../assets/images/web/iconS/yj.png")
          ],
          isSucess: false
        },
        {
          title: "签收",
          icos: [
            require("../../assets/images/web/iconU/qs.png"),
            require("../../assets/images/web/iconS/qs.png")
          ],
          isSucess: false
        },
        {
          title: "评价",
          icos: [
            require("../../assets/images/web/iconU/pj.png"),
            require("../../assets/images/web/iconS/pj.png")
          ],
          isSucess: false
        }
      ],

      tabPosition: 0, //支付方式切换
      isShow1: false, //立即支付弹窗
      isShow2: false, //物流信息弹窗
      isShow3: false, //确认收货弹窗
      isShow4: false, //立即评价区域
      isShow5: false, //上传凭证
      steps: "2", //刻章办理进度
      // isHiden1: true, //是否显示立即支付按钮
      // isHiden2: false, //是否显示确认收货按钮
      isHiden3: true, //是否显示立即评价按钮
      isHiden4: false, //是否显示评价取消/确认按钮
      activeName: "second",
      imageUrl: "", //上传凭证
      url: "", //上传图片接口
      msgCorp: {}, //办理公司
      msgShop: {}, //刻章店铺
      companyInfo: {}, //公司店铺信息
      orderMainInfo: {}, //订单详细
      kzOrderMainDetailList: [], //订单列表
      LogisticsList: [], //物流列表
      //更新支付状态
      params1: {
        kzActPayImg: "",
        kzActPayNum: "",
        kzActPayType: "",
        kzActPayUserName: "",
        kzMId: "",
        Authorization: ""
      },
      //更新评价状态
      params2: {
        kzActEvalDesc: "", //评价内容
        kzMId: "", //刻章订单主键
        num: null, //评价星级
        userName: "", //评价用户名
        Authorization: "" //Token
      }
    };
  },
  components: {
    "v-Header": header,
    "v-Cate": cate
  },
  computed: {
    count: function() {
      var cont = 0;
      for (var tmp of this.kzOrderMainDetailList) {
        cont += tmp.kzDGzCount;
      }
      return cont;
    },
    total() {
      return (
        Number(this.orderMainInfo.kzZMoney) +
        Number(this.orderMainInfo.kzSendMoney)
      );
    }
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    steps: function(val) {
      for (var i = 0; i < this.process2.length; i++) {
        if (i < val) {
          this.process2[i].isSucess = true;
        } else {
          this.process2[i].isSucess = false;
        }
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      //办理公司
      this.msgCorp = storage.get("msgCorp");
      //刻章店铺
      this.msgShop = storage.get("msgShop");
      //上传图片接口
      this.url = config.baseUrl + "/common/api/uploadFormData";

      //初始化参数
      this.params1.kzMId = this.msgCorp.kzMId
        ? this.msgCorp.kzMId
        : this.msgCorp.kzOrderMainInfo.kzMId;
      this.params1.Authorization = this.$store.state.token;
      this.params1.kzActPayUserName = this.$store.state.userName;
      this.params2.kzMId = this.msgCorp.kzMId
        ? this.msgCorp.kzMId
        : this.msgCorp.kzOrderMainInfo.kzMId;
      this.params2.userName = this.$store.state.userName;
      this.params2.Authorization = this.$store.state.token;

      //初始化单个刻章订单流程数据
      this.getKzOrderDetail();
    },
    //获取单个刻章订单流程数据
    getKzOrderDetail() {
      API.getKzOrderDetail({
        kzMId: this.params2.kzMId,
        Authorization: this.params2.Authorization
      })
        .then(res => {
          console.log(res);
          //console.log(res.data.companyInfo)
          //console.log(res.data.orderMainInfo);
          if (res.code === 0) {
            //公司店铺信息
            res.data.companyInfo.kzPayImg =
              config.baseUrl +
              "/common/api/download?downloadPath=" +
              res.data.companyInfo.kzPayImg;
            res.data.companyInfo.kzWechatImg =
              config.baseUrl +
              "/common/api/download?downloadPath=" +
              res.data.companyInfo.kzWechatImg;
            this.companyInfo = res.data.companyInfo;

            //订单信息
            res.data.orderMainInfo.kzBillModel = res.data.orderMainInfo
              .kzBillCompnayName
              ? "1"
              : "0";
            this.orderMainInfo = res.data.orderMainInfo;
            this.process2[0].name = this.orderMainInfo.kzActSubmitUserName;
            this.process2[0].date = this.orderMainInfo.kzActSubmitDate
              ? this.formatDate(this.orderMainInfo.kzActSubmitDate)
              : "";
            this.process2[1].name = this.orderMainInfo.kzActAccpetUserName;
            this.process2[1].date = this.orderMainInfo.kzActAcceptDate
              ? this.formatDate(this.orderMainInfo.kzActAcceptDate)
              : "";
            this.process2[2].name = this.orderMainInfo.kzActPayUserName;
            this.process2[2].date = this.orderMainInfo.kzActPayDate
              ? this.formatDate(this.orderMainInfo.kzActPayDate)
              : "";
            this.process2[3].name = this.orderMainInfo.kzActSendUserName;
            this.process2[3].date = this.orderMainInfo.kzActSendDate
              ? this.formatDate(this.orderMainInfo.kzActSendDate)
              : "";
            this.process2[4].name = this.orderMainInfo.kzActReceiveUserName;
            this.process2[4].date = this.orderMainInfo.kzActReceiveDate
              ? this.formatDate(this.orderMainInfo.kzActReceiveDate)
              : "";
            this.process2[5].name = this.orderMainInfo.kzActEvalUserName;
            this.process2[5].date = this.orderMainInfo.kzActEvalDate
              ? this.formatDate(this.orderMainInfo.kzActEvalDate)
              : "";

            this.kzOrderMainDetailList =
              res.data.orderMainInfo.kzOrderMainDetailList;
            //当前刻章办理进度
            this.steps = this.orderMainInfo.kzOrderStatus;
            console.log(this.steps);
            if (this.orderMainInfo.kzOrderStatus == 6) {
              this.params2.num = this.orderMainInfo.kzActEvalNum;
              this.orderMainInfo.kzActEvalDate = this.formatDate(
                this.orderMainInfo.kzActEvalDate
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上传凭证
    handleAvatarSuccess(res, file) {
      this.isShow5 = true;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.params1.kzActPayImg = res;
      //console.log(res);
      //console.log(file);
    },
    //确定凭证
    sure() {
      // this.isHiden1 = false;
      // this.isHiden2 = true;
      this.params1.kzActPayNum = this.orderMainInfo.kzActAccpetMonNum;
      this.params1.kzActPayType = this.tabPosition == "0" ? 1 : 2;
      console.log(this.params1);
      API.payKzOrder(this.params1)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.isShow1 = false;
            this.getKzOrderDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看物流信息
    logistics() {
      API.logisticsTrack({
        expCode: this.orderMainInfo.kzActSendKd,
        //expCode: "ZTO",
        expNo: this.orderMainInfo.kzActSendNum,
        //expNo: 75163235528158,
        Authorization: this.$store.state.token
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.LogisticsList = JSON.parse(res.data.data).Traces.reverse();
            for (var tmp of this.LogisticsList) {
              var index = tmp.AcceptTime.indexOf(":") - 2;
              var reg = new RegExp("(.{" + index + "})(.*)");
              tmp.AcceptTime = tmp.AcceptTime.replace(reg, "$1 $2");
            }
            if (this.LogisticsList.length == 0) {
              this.$notify({
                title: "警告",
                message: "暂无物流信息！",
                type: "warning"
              });
              return
            } else {
              this.isShow2 = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //确认收货
    confirm1() {
      API.reKzOrder({
        kzMId: this.params2.kzMId,
        userName: this.params2.userName,
        Authorization: this.params2.token
      })
        .then(res => {
          console.log(res);
          console.log(res.code === 0);
          if (res.code === 0) {
            this.isShow3 = false;
            // this.isHiden2 = false;
            this.isHiden3 = true;
            this.getKzOrderDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即评价
    evaluate() {
      this.isHiden3 = false;
      this.isShow4 = true;
      this.isHiden4 = true;
    },
    confirm2() {
      API.talkKzOrder(this.params2)
        .then(res => {
          console.log(res);
          console.log(res.code === 0);
          if (res.code === 0) {
            this.getKzOrderDetail();
            // this.$router.push({
            //   path: "blkzList"
            // });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消评价
    cancel() {
      this.isShow4 = false;
      this.isHiden3 = true;
      this.isHiden4 = false;
    },
    //上一步
    prev() {
      this.$router.go(-1);
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
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  }
};
</script>
<style lang="less" scoped>
.clear {
  clear: both;
  height: 0;
  overflow: hidden;
}
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
.red {
  color: #ff3e3e;
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
    .old {
      text-decoration: line-through;
    }
    .new {
      font-size: 2.2rem !important;
      font-weight: bold;
    }
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
        padding: 1.5rem 0;
      }
      th:last-child {
        font-weight: normal;
        div {
          font-size: 1.6rem;
        }
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

  .msg-top-ul {
    li {
      font-size: 1.4rem;
      padding: 0.3rem 0;
    }
    li.orange {
      color: #ffa200;
      cursor: pointer;
    }
  }
}
.cartD {
  padding: 1rem 0;
  .msg-midddle-cate {
    color: #333333;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .msg-top-ul {
    li {
      font-size: 1.4rem;
      padding: 0.3rem 0;
      span {
        color: #ff3e3e;
      }
    }
    li:last-child {
      font-size: 1.6rem;
      font-weight: bold;
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
.cartG {
  .el-radio-group {
    width: 100%;
    label {
      width: 50%;
    }
  }
  .cartG-title {
    text-align: center;
    color: #333333;
    font-size: 1.6rem;
  }
  .cartG-img {
    display: flex;
    justify-content: center;
    li {
      width: 28.57%;
      display: flex;
      align-items: center;
    }
    li:nth-child(2) {
      margin-left: 1rem;
    }
  }
  .cartG-btn {
    justify-content: center;
    display: flex;
    div {
      width: 28.57%;
      button {
        padding: 0.5rem 0;
        width: 100%;
        height: 100%;
        border: 0;
        background: #ffa200;
        color: #fff;
      }
    }
    div:nth-child(2) {
      margin-left: 1rem;
    }
  }
  .cartG-note {
    text-align: center;
    font-size: 1.4rem;
    color: #999999;
  }
}
.cartH {
  .cartH-table {
    padding: 1rem 1.5rem;
    thead {
      font-size: 1.4rem;

      th {
        padding-bottom: 1rem;
        font-weight: normal;
      }
    }
    tbody {
      font-size: 1.2rem;
      tr:first-child {
        td {
          color: #ffa200;
          i {
            background: #ffa200;
          }
        }
      }
      tr:last-child {
        td {
          padding: 0;
        }
      }
      td {
        padding-bottom: 2.5rem;

        i {
          position: relative;
          min-width: 8px;
          min-height: 8px;
          border-radius: 50%;
          display: inline-block;
          background: #cccccc;
          z-index: 1;
        }
      }
      td:nth-child(1) {
        width: 22.8%;
        min-width: 102px;
        text-align: center;
        vertical-align: top;
      }
      td:nth-child(2) {
        position: relative;
        width: 5.3%;
        vertical-align: top;
        text-align: center;
        .line {
          position: absolute;
          top: 8px;
          width: 100%;
          background: url("../../assets/images/web/blkz-tp5.png") repeat-y
            center;
          height: 100%;
          flex: 1;
        }
      }
      td:nth-child(3) {
        width: 71.9%;
      }
    }
  }
}
</style>
<style lang="less">
.el-radio-button__inner {
  background: #f5f5f5;
  color: #999999;
}
.el-radio-button__orig-radio:disabled + .el-radio-button__inner {
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
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  padding: 0;
}
.cartG {
  .el-radio-button__inner {
    width: 100%;
  }
  .el-dialog__header {
    display: none;
  }
}
.cartH,
.cartI {
  .el-dialog__header {
    border-bottom: 1px solid #f2f2f2;
    height: 4.5rem;
    line-height: 4.5rem;
    padding-left: 1.5rem;
  }
}
.cartI {
  .el-dialog__body {
    text-align: center;
    padding: 4rem 0;
  }
  .el-dialog__footer {
    text-align: center;
    border-top: 1px solid #f5f5f5;
    padding: 1rem 0;
    button {
      color: #fff;
      font-size: 1.6rem;
      padding: 1rem 0;
      width: 26.1%;
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
}
.el-dialog__title {
  font-size: 1.4rem;
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
.el-upload {
  width: 100%;
}
</style>

