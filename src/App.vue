<template>
  <div id="app">
   <Index></Index>
   <router-view name="login" />
  </div>
</template>

<script>
 import Index from './views/index.vue' 

export default {
   name: 'app',
   data() {
    return {
     
    }
  },
  components:{ Index },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.main {
}
</style>
