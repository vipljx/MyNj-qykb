<template>
  <div class="loginTwo" v-loading="fullscreenLoading">
    <div class="logo">
      <img src="../assets/images/web/login-tp1.png" alt />
    </div>
    <div class="cont">
      <div class="cont-bj">
        <img src="../assets/images/web/login-tp2.png" alt />
      </div>
      <div class="idCard">
        <div class="idCard-bt">身份证信息存档</div>
        <ul class="idCard-ul">
          <li>
            <div class="idCard-left">身份证正面</div>
            <div class="idCard-right">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :show-file-list="false"
                :on-success="handleAvatarSuccessZ"
              >
                <img v-if="uFileImgZmPath" :src="uFileImgZmPath" class="avatar" />
                <div v-else class="load">
                  <img class="load-ico" src="../assets/images/web/login-tp4.png" />
                  <div class="load-bt">请上传身份证正面</div>
                </div>
              </el-upload>
              <el-tooltip placement="right">
                <div slot="content">
                  <div class="slot-cont">
                    <div class="slot-bt">拍照示例</div>
                    <div class="slot-img">
                      <img src="../assets/images/web/login-tp6.png" alt />
                    </div>
                    <div class="slot-note">拍照时请确保身份证边框完整、图像清晰、清晰、光线均匀</div>
                  </div>
                </div>
                <img src="../assets/images/web/login-tp5.png" alt class="idCard-ico" />
              </el-tooltip>
            </div>
          </li>
          <li>
            <div class="idCard-left">身份证反面</div>
            <div class="idCard-right">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :show-file-list="false"
                :on-success="handleAvatarSuccessF"
              >
                <img v-if="uFileImgFmPath" :src="uFileImgFmPath" class="avatar" />
                <div v-else class="load">
                  <img class="load-ico" src="../assets/images/web/login-tp4.png" alt />
                  <div class="load-bt">请上传身份证反面</div>
                </div>
              </el-upload>
              <el-tooltip placement="right">
                <div slot="content">
                  <div class="slot-cont">
                    <div class="slot-bt">拍照示例</div>
                    <div class="slot-img">
                      <img src="../assets/images/web/login-tp7.png" alt />
                    </div>
                    <div class="slot-note">拍照时请确保身份证边框完整、图像清晰、清晰、光线均匀</div>
                  </div>
                </div>
                <img src="../assets/images/web/login-tp5.png" alt class="idCard-ico" />
              </el-tooltip>
            </div>
          </li>
          <li>
            <div class="idCard-left"></div>
            <div class="idCard-you">
              <button class="idCard-btn" @click="submit">提交</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
//引入config
import config from "@/api/config";
//引入vuex
import { mapMutations } from "vuex";
//调用接口
import { APIuser } from "@/api/index";
export const API = new APIuser();
export default {
  name: "loginTwo",
  data() {
    return {
      url: "",
      uFileImgZmPath: "",
      uFileImgFmPath: "",
      params: {
        uFileCode: "", //用户身份证号
        uFileImgFmPath: "", //身份证反面
        uFileImgZmPath: "", //身份证正面
        Authorization: "" //Token
      },
      fullscreenLoading: false //loading
    };
  },
  created() {
    //console.log(this.$store.state);
    //初始化参数
    this.params.uFileCode = this.$store.state.sfCode;
    this.params.Authorization = this.$store.state.token;
    //上传图片接口
    this.url = config.baseUrl + "/common/api/uploadFormData";
  },
  methods: {
    ...mapMutations([
      "updateFlag" // 将 `this.updateFlag()` 映射为 `this.$store.commit('updateFlag')`
    ]),
    //身份证正面上传
    handleAvatarSuccessZ(res, file) {
      this.uFileImgZmPath = URL.createObjectURL(file.raw);
      this.params.uFileImgZmPath = res;
    },
    //身份证反面上传
    handleAvatarSuccessF(res, file) {
      this.uFileImgFmPath = URL.createObjectURL(file.raw);
      this.params.uFileImgFmPath = res;
    },
    //用户身份证信息上传
    submit() {
      if (!this.params.uFileImgZmPath) {
        this.$notify({
          title: "警告",
          message: "请上传身份证正面",
          type: "warning"
        });
        return;
      } else if (!this.params.uFileImgFmPath) {
        this.$notify({
          title: "警告",
          message: "请上传身份证反面",
          type: "warning"
        });
        return;
      }
      this.fullscreenLoading = true;
      API.addUserInfo(this.params)
        .then(res => {
          console.log(res);
          this.fullscreenLoading = false;
          if (res.code === 0) {
            this.updateFlag(true);
            this.$router.push({
              path: "gsdjList"
            });
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
  .idCard {
    background: #f5f5f5;
    width: 81.94%; //590
    margin: 0 auto;
    border-radius: 10px;
    .idCard-bt {
      color: #333333;
      font-size: 1.8rem;
      text-align: center;
      line-height: 5rem;
      font-weight: bold;
    }
    .idCard-ul {
      width: 79.66%; //470
      margin: 0 auto;
      li {
        display: flex;
        align-items: center;
        padding-bottom: 8px;

        .idCard-left {
          width: 19.57%;
          font-size: 1.6rem;
        }
        .idCard-right {
          width: 60.85%;
          position: relative;
          background: #ffffff;
          border-radius: 5px;
          height: 15.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .avatar-uploader {
            width: 100%;
            .load-ico {
              width: 19.79%;
              margin-bottom: 1rem;
            }
            .load-bt {
              color: #999999;
              font-size: 1.2rem;
            }
          }
          .avatar {
            width: 69.79%;
            height: 12.8rem;
          }
          .idCard-ico {
            position: absolute;
            width: 4.86%;
            top: 8px;
            right: 8px;
          }
        }
        .idCard-you {
          width: 60.85%;
          text-align: center;
          padding: 0.8rem 0;
          .idCard-btn {
            background: #ffa200;
            color: #ffffff;
            font-size: 1.4rem;
            padding: 1rem 6rem;
            border: 0;
            border-radius: 5px;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .cont-bj {
    width: 100%;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
}
.slot-cont {
  width: 88.46%;
  margin: 0 auto;
  .slot-bt {
    color: #333333;
    font-size: 1.2rem;
  }
  .slot-img {
    margin: 1rem auto;
    width: 62.6%;
  }
  .slot-note {
    color: #999999;
    font-size: 1.2rem;
  }
}
</style>
<style lang="less">
.el-tooltip__popper.is-dark {
  background: #ffffff;
  color: #666666;
  box-shadow: 1px 0 16px #bebebe;
  width: 260 * @precision;
}
.el-tooltip__popper[x-placement^="right"] .popper__arrow {
  left: -6px;
  border-right-color: #ffffff;
  border-left-width: 0;
}
.el-tooltip__popper[x-placement^="right"] .popper__arrow::after {
  bottom: -5px;
  left: 1px;
  border-right-color: #ffffff;
  border-left-width: 0;
}
.el-upload {
  width: 100%;
}
</style>
