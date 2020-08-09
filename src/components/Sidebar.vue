<template>
    <div>
       <el-menu
        router
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF">
      <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
    </el-menu>
    </div>
</template>


<script>
import SidebarItem from './SidebarItem'
export default {
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
