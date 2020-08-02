<template>
  <div>
    <div ref="chartEl"
         :style="eStyle"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    eStyle: {
      type:Object
    },
  },
  methods: {
    setOption (option) {
      this.chart && this.chart.setOption(option)
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chartEl)
  },
  watch: {
    option: {
      handler (newValue, oldValue) { // eslint-disable-line no-unused-vars
        this.chart.setOption(newValue);
      },
      deep: true
    }
  }
}
</script>


<style scoped lang="scss">
</style>
