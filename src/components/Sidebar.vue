<template>
    <div>
       <el-menu
       :default-active="activeMenu"
        router
        mode="vertical"
        active-text-color="#409EFF">
      <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" :parentPath="menu.path"/>
    </el-menu>
    </div>
</template>


<script>
import SidebarItem from './SidebarItem'
export default {
    computed: {
    activeMenu() {
      const route = this.$route
      const { path } = route
     
      return path
    },
    },
    components: {
        SidebarItem
    },
    props: {
        menuList: {
           type: Array,
           required: true
        }
    }
}
</script>


<style lang="scss" scoped>
</style>
