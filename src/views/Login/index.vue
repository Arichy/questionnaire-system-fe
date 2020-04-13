<template>
  <div class="container">
    <div class="wrapper">
      <div class="left">
        <div class="tab">
          <div :class="['tab-item', activeTab === TABS.LOGIN && 'active']">
            <span @click="switchTab(TABS.LOGIN)">Log in</span>
          </div>
          <div :class="['tab-item', activeTab === TABS.SIGNUP && 'active']">
            <span @click="switchTab(TABS.SIGNUP)">Sign up</span>
          </div>
        </div>
        <div class="form" :style="{ width: `${formWrapperWidth}px` }">
          <div
            class="form-wrapper"
            :style="{
              left: `${activeTab === TABS.LOGIN ? 0 : -loginFormWidth - 20}px`,
            }"
          >
            <LoginForm
              class="login-form"
              ref="loginForm"
              @submit="loginSubmit"
            />
            <SignupForm
              class="signup-form"
              ref="signupForm"
              @submit="signupSubmit"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">Questionnaire System</div>
        <div class="sub-title">
          A System for data collection from people
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";

import SignupForm from "@/components/Login/SignupForm";
import LoginForm from "@/components/Login/LoginForm";

import { TABS, DEFAULT_PATH_AFTER_LOGIN } from "./const";

import IO from "./api";

export default {
  name: "login",
  components: {
    SignupForm,
    LoginForm,
  },
  data() {
    return {
      TABS,
      activeTab: TABS.LOGIN,
      loginFormWidth: 0,
      signupFormWidth: 0,
    };
  },
  computed: {
    formWrapperWidth() {
      return Math.max(this.loginFormWidth, this.signupFormWidth);
    },
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    async send(method, data, onSuccess, onError) {
      try {
        const res = await IO[method](data);
        if (res.success) {
          if (typeof onSuccess === "function") {
            onSuccess(res);
          } else {
            Modal.info({ content: res.msg });
          }
        } else {
          if (typeof onError === "function") {
            onError();
          } else {
            Modal.error({ content: res.msg });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async loginSubmit(data) {
      this.send("login", data, res => {
        const { token } = res;
        sessionStorage.setItem("token", token);
        this.$router.push(DEFAULT_PATH_AFTER_LOGIN);
      });
    },
    async signupSubmit(data) {
      this.send("signup", data);
    },
  },
  mounted() {
    const { loginForm, signupForm } = this.$refs;
    this.loginFormWidth = loginForm.$el.offsetWidth;
    this.signupFormWidth = signupForm.$el.offsetWidth;
  },
};
</script>

<style lang="scss" scoped>
$subBgc: rgb(58, 83, 198);
$bgc: rgb(245, 245, 253);

$wrapperWidth: 1000px;

.container {
  overflow: scroll;
  background-color: $bgc;
  min-height: 100%;
}

.wrapper {
  // padding-top: 100px;
  margin: 100px auto;

  width: $wrapperWidth;
  height: 720px;
  // box-sizing: content-box;

  border-radius: 5px;
  overflow: hidden;
  display: flex;

  .left {
    width: $wrapperWidth * 3 / 7;
    padding: 50px 50px;
    background: white;
    display: flex;
    flex-direction: column;
    .title-wrapper {
      font-size: 20px;
      font-weight: bold;
      color: black;
      display: flex;

      padding-top: 20px;
      padding-bottom: 20px;
    }

    .tab {
      display: flex;

      height: 50px;
      // background: red;
      align-items: flex-end;
      .tab-item {
        font-size: 15px;
        flex: 1;
        color: rgba(205, 205, 218);
        display: flex;
        justify-content: center;
        transition-property: font-size;
        transition-duration: 0.1s;
        > span {
          cursor: pointer;
        }
      }

      .tab-item.active {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.9);
      }
    }

    .form {
      margin-top: 10px;
      height: 100%;
      .duration {
        animation-duration: 130ms;
      }
      position: relative;
      overflow: hidden;

      .form-wrapper {
        display: flex;
        overflow: hidden;
        position: absolute;
        left: 0px;
        transition-property: left;
        transition-duration: 0.4s;
        .login-form {
          flex-shrink: 0;
        }
        .signup-form {
          flex-shrink: 0;
          margin-left: 20px;
        }
      }
    }
  }

  .right {
    width: $wrapperWidth * 4 / 7;
    background: $subBgc;

    color: white;

    display: flex;
    flex-direction: column;
    padding: 16px;

    .title {
      font-weight: 900;
      font-size: 40px;
      margin-top: 50px;
      align-self: center;
    }
    .sub-title {
      font-size: 20px;
      margin-top: 50px;
      align-self: flex-end;
    }
  }
}
</style>
