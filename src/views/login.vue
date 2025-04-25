<template>
  <div class="login">
    <div class="login-container">
      <div class="login-left">
        <div class="login-left-content">
          <h2>欢迎使用</h2>
          <h1>山西云时代科研项目管理系统</h1>
          <p>高效、便捷的项目管理平台</p>
        </div>
      </div>
      <div class="login-right">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
          <!-- <h3 class="title">科研项目管理系统</h3> -->
          <el-form-item v-if="tenantEnabled" prop="tenantId">
            <el-select v-model="loginForm.tenantId" filterable placeholder="请选择/输入公司名称" style="width: 100%">
              <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId"></el-option>
              <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
            </el-select>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
              <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
              <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="captchaEnabled" prop="code">
            <el-input v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter="handleLogin">
              <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" class="login-code-img" @click="getCode" />
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">记住密码</el-checkbox>
          <el-form-item style="width: 100%">
            <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div v-if="register" style="float: right">
              <router-link class="link-type" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2024 山西太行实验室 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCodeImg, getTenantList } from '@/api/login';
import { authBinding } from '@/api/system/social/auth';
import { useUserStore } from '@/store/modules/user';
import { LoginData, TenantVO } from '@/api/types';
import { to } from 'await-to-js';
import { HttpStatus } from '@/enums/RespEnum';

const userStore = useUserStore();
const router = useRouter();

const loginForm = ref<LoginData>({
  tenantId: '000000',
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
} as LoginData);

const loginRules: ElFormRules = {
  tenantId: [{ required: true, trigger: 'blur', message: '请输入您的租户编号' }],
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
};

const codeUrl = ref('');
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 租户开关
const tenantEnabled = ref(true);

// 注册开关
const register = ref(false);
const redirect = ref('/');
const loginRef = ref<ElFormInstance>();
// 租户列表
const tenantList = ref<TenantVO[]>([]);

watch(
  () => router.currentRoute.value,
  (newRoute: any) => {
    redirect.value = newRoute.query && decodeURIComponent(newRoute.query.redirect);
  },
  { immediate: true }
);

const handleLogin = () => {
  loginRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 localStorage 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        localStorage.setItem('tenantId', String(loginForm.value.tenantId));
        localStorage.setItem('username', String(loginForm.value.username));
        localStorage.setItem('password', String(loginForm.value.password));
        localStorage.setItem('rememberMe', String(loginForm.value.rememberMe));
      } else {
        // 否则移除
        localStorage.removeItem('tenantId');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      // 调用action的登录方法
      const [err] = await to(userStore.login(loginForm.value));
      if (!err) {
        const redirectUrl = redirect.value || '/';
        await router.push(redirectUrl);
        loading.value = false;
      } else {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          await getCode();
        }
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

/**
 * 获取验证码
 */
const getCode = async () => {
  const res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
};

const getLoginData = () => {
  const tenantId = localStorage.getItem('tenantId');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const rememberMe = localStorage.getItem('rememberMe');
  loginForm.value = {
    tenantId: tenantId === null ? String(loginForm.value.tenantId) : tenantId,
    username: username === null ? String(loginForm.value.username) : username,
    password: password === null ? String(loginForm.value.password) : String(password),
    rememberMe: rememberMe === null ? false : Boolean(rememberMe)
  } as LoginData;
};

/**
 * 获取租户列表
 */
const initTenantList = async () => {
  const { data } = await getTenantList();
  tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled;
  if (tenantEnabled.value) {
    tenantList.value = data.voList;
    if (tenantList.value != null && tenantList.value.length !== 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId;
    }
  }
};

/**
 * 第三方登录
 * @param type
 */
const doSocialLogin = (type: string) => {
  authBinding(type, loginForm.value.tenantId).then((res: any) => {
    if (res.code === HttpStatus.SUCCESS) {
      // 获取授权地址跳转
      window.location.href = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
};

onMounted(() => {
  getCode();
  initTenantList();
  getLoginData();
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background1.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-container {
  display: flex;
  width: 850px;
  height: 480px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.login-left {
  width: 450px;
  background: rgba(76, 175, 80, 0.15);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.login-left-content {
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: left;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
    font-family: ssh;
    line-height: 1.4;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
    opacity: 0.9;
  }

  p {
    font-size: 16px;
    opacity: 0.8;
  }
}

.login-right {
  width: 400px;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #333;
  font-family: ssh;
  font-weight: bold;
  font-size: 26px;
  letter-spacing: 1px;
}

.login-form {
  width: 85%;
  padding: 20px 0;
  transition: all 0.3s ease;

  .el-input {
    height: 42px;
    margin-bottom: 5px;

    .el-input__inner {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      border: 1px solid rgba(144, 144, 144, 0.25);
      transition: all 0.3s;

      &:focus {
        border-color: rgba(76, 175, 80, 0.6);
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      }
    }

    input {
      height: 42px;
    }
  }

  .el-button {
    background-color: rgba(76, 175, 80, 0.85);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    height: 46px;
    letter-spacing: 1px;
  }

  .el-button:hover {
    background-color: rgba(76, 175, 80, 1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }

  .el-button:active {
    background-color: rgba(76, 175, 80, 0.8);
    transform: translateY(0);
  }

  .input-icon {
    height: 39px;
    width: 16px;
    margin-left: 5px;
    color: #666;
  }

  .el-checkbox {
    margin: 10px 0 25px 0;
    color: #555;
    font-size: 14px;
  }

  .link-type {
    color: #4CAF50;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: #367c39;
      text-decoration: underline;
    }
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #888;
  margin-top: 15px;
}

.login-code {
  width: 33%;
  height: 42px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial, serif;
  font-size: 14px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  padding: 5px 0;
}

.login-code-img {
  height: 42px;
  padding-left: 12px;
  border-radius: 8px;
}

@media (max-width: 992px) {
  .login-container {
    width: 400px;
    height: auto;
  }

  .login-left {
    display: none;
  }

  .login-right {
    width: 100%;
  }
}
</style>
