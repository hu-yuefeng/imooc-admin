<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :rules="rules"
      :model="loginForm"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("msg.login.title") }}</h3>
        <LangSelect class="loginLangSelect" />
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user" />
        </span>
        <el-input
          type="text"
          name="username"
          v-model="loginForm.username"
          placeholder="Pick a date"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password" />
        </span>
        <el-input
          name="password"
          v-model="loginForm.password"
          placeholder="Pick a password"
          :type="isShowPwd"
        />
        <span class="show-pwd">
          <el-icon @click="changePwdType">
            <SvgIcon :icon="isShowPwd === 'password' ? 'eye' : 'eye-open'" />
          </el-icon>
        </span>
      </el-form-item>
      <!-- login-btn -->
      <el-button
        type="primary"
        @click="handleLogin"
        class="login-btn"
        :loading="loading"
        >{{ $t("msg.login.loginBtn") }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon";
import LangSelect from "@/components/langSelect";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const loginForm = ref({
  username: "super-admin",
  password: "123456",
});
const i18n = useI18n();
const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.t("msg.login.passwordRule")));
    } else {
      callback();
    }
  };
};
const rules = ref({
  username: [
    {
      required: true,
      trigger: "change",
      message: computed(() => {
        return i18n.t("msg.login.usernameRule");
      }),
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validatePassword(),
    },
  ],
});
const isShowPwd = ref("password");

const changePwdType = () => {
  if (isShowPwd.value === "password") {
    isShowPwd.value = "text";
  } else {
    isShowPwd.value = "password";
  }
};

// 登录请求事件
const loading = ref(false);
const loginFormRef = ref(null);
const store = useStore();
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    const loading = ref(true);
    if (!valid) return;
    store
      .dispatch("user/login", loginForm.value)
      .then((res) => {
        const { message, code } = res;
        loading.value = false;
        ElMessage({
          message: message,
          type: code === 200 ? "success" : "error",
        });
      })
      .catch((err) => {
        loading.value = false;
      });
  });
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

// 处理 input 的白/蓝边
::v-deep .el-input__inner {
  box-shadow: none;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;
    ::v-deep .loginLangSelect {
      background-color: #fff;
      border-radius: 2px;
      padding: 3px;
      position: absolute;
      font-size: 26px;
      top: 0;
      right: 0;
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    // ::v-deep .lang-select {
    //   position: absolute;
    //   top: 4px;
    //   right: 0;
    //   background-color: white;
    //   font-size: 22px;
    //   padding: 4px;
    //   border-radius: 4px;
    //   cursor: pointer;
    // }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
