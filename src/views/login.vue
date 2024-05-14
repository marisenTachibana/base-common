<script setup>
import { ref ,reactive} from 'vue';
import bcrypt from 'bcryptjs';
import utils from '@/utils';
const ruleFormRef=ref();
const cost = 10; //加密盐值
const loginForm = ref({
  username: '',
  password: '',
});

const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 4, max: 16, message: '用户名的长度为4~16', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
})
const onLogin =  () => {
  //验证
  if(ruleFormRef.value.validate()){
    
  }
  
};
</script>
<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-card">
        <div class="login-title">通用后台管理系统</div>
        <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
          status-icon
          size="large"
        >
          <el-form-item prop="username" class="login-item">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
            >
              <template #prepend>
                <el-icon><User /></el-icon></template
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              ><template #prepend>
                <el-icon><Lock /></el-icon></template
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button class="login-button" type="primary" @click="onLogin"
          >登&emsp;录</el-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(@/assets/images/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.login-box {
  position: absolute;
  top: 50%;
  right: 200px;
  width: 520px;
  transform: translate(0,-50%);
  .login-card {
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    padding: 50px;
    &::after {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-color: rgba(62, 96, 255, 0.6);
      position: absolute;
      content: "";
      display: block;
      top: -50px;
      right: -60px;
    }
.login-item{
  margin: 40px;
}
    .login-button {
      width: 100%;
      font-size: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .login-title {
    font-size: 32px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
