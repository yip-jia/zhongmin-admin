<template>
    <div>
        <el-container class="fixed">
       <!-- 头部 -->
      <el-header height="68px" class="header">
        <img :src="imgsrc" alt="中民logo">
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="200px" class="el-aside" >
           <Sidebar :menuList="menuList"></Sidebar> 
           <!-- <el-menu active-text-color="#409EFF" :router="true">
            <el-menu-item index="/">
               <i class="el-icon-house"></i>
               <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user/userAdmin">
                  中民用户管理
                </el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                 <i class="el-icon-s-order"></i>
                  <span>订单管理</span>
              </template>              
            </el-submenu>
          </el-menu>  -->
         
        </el-aside>
        <!-- 内容 -->
      <el-main class="el-main main" >
          <router-view :key="this.$route.path"/>
      </el-main>
      </el-container>
    </el-container> 
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import { setTimeout } from 'timers';
//import { setTimeout } from 'timers';
export default {
    mounted() {
      setTimeout(() => {
         this.menuList = this.$store.state.login.addRouters
      },3000)
    },
    data() {
         return {
            imgsrc: require('../assets/img/logo.jpg'),
            menuList:[]
         }
    },
     components:{Sidebar}, 
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

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.main {
  position: relative;
  height: calc(100 * 1vh - 68px);
  background: #f5f5f5;
}
</style>
