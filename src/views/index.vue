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
export default {
    mounted() {
         this.menuList = this.$store.state.login.addRouters
    },
    data() {
         return {
            imgsrc: require('../assets/img/logo.jpg'),
            menuList:[]
         }
    },
    components:{
       Sidebar
    }, 
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
