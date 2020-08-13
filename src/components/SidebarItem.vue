<template>
  <div>
     <template v-if="item.children&&hasOnlyChild(item.children,item)">
      <el-menu-item :index="onlyChildPath">
        <i :class="onlyOneChild.meta.icon"></i>
        {{onlyOneChild.meta.title}}
      </el-menu-item>
    </template>

    <el-submenu v-else
                :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        {{item.meta.title}}
      </template>
      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0"
                      :item="child"
                      :key="child.path" 
                      :parentPath="`${parentPath}/${child.path}`"/>
        <el-menu-item v-else
                      :key="child.path"
                      :index="`${parentPath}/${child.path}`">
          {{child.meta.title}}
        </el-menu-item>
      </template>
    </el-submenu>



  </div>
</template>


<script>
export default {
  mounted() {
   console.info(this.parentPath)
  },
  data() {
    return {
     onlyOneChild: '',
     onlyChildPath: ''
    }
  },
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    parentPath: {
      type: String,
      default:''
    }
  },
  methods: {
    hasOnlyChild(children = [], parent) {
    if(parent.meta) {
      return false
    }else {
      this.onlyOneChild = children[0]
      parent.path !== '/' ? this.onlyChildPath = `${parent.path}/${children[0].path}`: children[0].path
      return true
    }
  }
  }
}
</script>


<style lang="scss" scoped>
</style>
