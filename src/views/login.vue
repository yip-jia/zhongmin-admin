<template>
  <div class="login">
    <el-card class="logincard">
      <el-row class="mb20">
        <img :src="imgsrc"
             class="logo">
      </el-row>
      <el-row class="mb20">
        <el-input placeholder="请输用户密码"
                  prefix-icon="el-icon-user"
                  v-model="username">
        </el-input>
      </el-row>
      <el-row class="mb20">
        <el-input placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  type="password"
                  v-model="password">
        </el-input>
      </el-row>
      <el-row>
        <el-button type="primary"
                   class="but"
                   @click="loginhandle">登录</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import roles from '../mock/roles.js'
/* import { setTimeout } from 'timers'; */

export default {
  data () {
    return {
      username: 'admin',
      password: 'admin',
      imgsrc: 'https://images.zhongmin.cn/zhongmin_wap2017/index/images/index-logo.png'
    }
  },
  methods: {
    loginhandle () {
      if (this.username === roles[0]['name']) {
        this.$store.dispatch('getInfo', roles[0])
      } else {
        this.$store.dispatch('getInfo', roles[1])
      }
   
        this.$router.push('/')
    
    }
  }
}
</script>

<style lang="scss">
.logo {
  width: 200px;
}
.login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0076cd;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mb20 {
  margin-bottom: 20px;
}
.logincard {
  width: 300px;
  text-align: center;
}
.but {
  width: 100%;
}
</style>
