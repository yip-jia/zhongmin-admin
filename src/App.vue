<template>
  <div id="app">
     <el-container>
       <!-- 头部 -->
      <el-header height="68px" class="header">
        <img :src="imgsrc" alt="中民logo">
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="200px" class="el-aside">
          <el-menu active-text-color="#409EFF" :router="true">
            <el-submenu index="1">
              <template slot="title">
                 <i class="el-icon-s-order"></i>
                  <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/userAdmin">
                  中民用户管理
                </el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                 <i class="el-icon-s-order"></i>
                  <span>订单管理</span>
              </template>              
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue' */

export default {
   name: 'app',
   data() {
    return {
      imgsrc: require('./assets/img/logo.jpg')
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #0076cd;
  img {
    width: 200px;
  }
}
</style>
