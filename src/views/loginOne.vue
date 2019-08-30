<template>
  <div class="loginOne">
    <div class="logo">
      <img src="../assets/images/web/login-tp1.png" alt />
    </div>
    <div class="cont">
      <div class="cont-bj">
        <img src="../assets/images/web/login-tp2.png" alt />
      </div>
      <div class="chat">
        <div class="chat-bt">二维码登录</div>
        <div class="chat-img">
          <div id="qrcode"></div>
        </div>
        <div class="chat-note">请使用“我的南京”客户端扫一扫登录</div>
      </div>
    </div>
  </div>
</template>
<script>
//调用接口
import { APImynj, APIuser } from "@/api/index";
export const API1 = new APImynj();
export const API2 = new APIuser();
//引入qrcodejs2
import QRCode from "qrcodejs2";
//引入vuex
import { mapMutations } from "vuex";
export default {
  name: "loginOne",
  data() {
    return {
      weChatImg: "../assets/images/web/login-tp3.png",
      timer: null
    };
  },
  created() {
    //初始化token
    this.getToken();
  },
  methods: {
    ...mapMutations([
      "addToken",
      "addUser", // 将 `this.addUser()` 映射为 `this.$store.commit('addUser')`
      "updateFlag"
    ]),
    //获取token
    getToken() {
      API1.getToken({
        passWord: "admin",
        userAccount: "admin"
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.addToken(res.data);
            //初始化二维码
            this.getQrCode();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取二维码
    getQrCode() {
      //console.log(this.$store.state.token);
      API1.getQrCode({
        Authorization: this.$store.state.token //Token
      })
        .then(res => {
          //console.log(res);
          if (res.code === 0) {
            this.qrcode(res.data.qrCode, () => {
              this.timer = setInterval(() => {
                this.getUserInfo(res.data.custom);
              }, 3000);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //生成二维码
    qrcode(url, callBack) {
      let qrcode = new QRCode("qrcode", {
        width: 100,
        height: 100,
        text: url, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
      callBack();
    },
    //获取用户信息
    getUserInfo(custom) {
      API1.getUserInfo({
        custom: custom,
        Authorization: this.$store.state.token //Token
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.addUser(JSON.parse(res.data));
            this.getUserInfoFlag(JSON.parse(res.data));
            clearInterval(this.timer);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //用户是否已有信息存档
    getUserInfoFlag(userInfo) {
      API2.getUserInfoFlag({
        sfCode: userInfo.userSfCode,
        Authorization: this.$store.state.token //Token
      })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            if (res.data) {
              console.log("已存档");
              this.updateFlag(true);
              this.$router.push({
                path: "gsdjList"
              });
            } else {
              console.log("未存档");
              this.$router.push({
                path: "loginTwo"
              });
            }
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
.logo {
  width: 289 * @precision;
  margin: 0 auto;
  padding-top: 5rem;
  padding-bottom: 4rem;
}
.cont {
  width: 720 * @precision;
  height: 50.2rem;
  margin: 0 auto;
  position: relative;
  .chat {
    width: 81.94%;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    border-radius: 10px;
    text-align: center;
    .chat-bt {
      font-size: 2.8rem;
      height: 6.2rem;
      padding-top: 5.8rem;
      color: #333333;
    }
    .chat-img {
      width: 33.39%;
      margin: 0 auto;
    }
    .chat-note {
      height: 8.5rem;
      padding-top: 2rem;
      font-size: 2.4rem;
    }
  }
  .cont-bj {
    width: 100%;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
}
</style>
