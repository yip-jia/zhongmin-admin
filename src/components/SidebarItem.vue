<template>
  <div>
    <el-submenu v-if="item.children"
                :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        {{item.meta.title}}
      </template>
      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0"
                      :item="child"
                      :key="child.path" />
        <el-menu-item v-else
                      :key="child.path"
                      :index="`${item.path}/${child.path}`">
          <!-- <i :class="item.meta.icon"></i> -->
          {{child.meta.title}}
        </el-menu-item>
      </template>
    </el-submenu>


    <template v-else>
      <el-menu-item :index="item.path">
        <i :class="item.meta.icon"></i>
        {{item.meta.title}}
      </el-menu-item>
    </template>

  </div>
</template>


<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
