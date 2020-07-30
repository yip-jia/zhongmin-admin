<template>
  <div>
    <el-row class="row">
      <el-col>
        <div class="inner">
          <h4 class="title">累计销售额</h4>
          <p class="value">{{totalSale}}</p>
          <p></p>
          <div  id="main"></div>
        </div>
      </el-col>
      <el-col>1</el-col>
      <el-col>1</el-col>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  created () {
    this.getTotalAll()
  },
  mounted () {
    this.myEcharts();
  },
  data() {
    return {
      totalSale:''
    }
  },
  methods: {
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {
          show: false
        },
        series: [{
          
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    async getTotalAll() {
    var params = {
      beginTime: '2020-07-01',
      endTime: '2020-07-30',
      companyId: -1,
      statisticsType: 1,
    }
    let res = await this.$Http.getTotalAll(params)
      let tot = 0 
      for(let i in res) {
         tot += parseInt(res[i]['sInsureMoney'])
      }
      this.totalSale = `￥${tot.toLocaleString()}`
     
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: 50px;
}
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.row .el-col {
  width:33.33%;
  padding: 20px;
  box-sizing: border-box;
}
.inner{
  background: #fff;
  padding:20px;
}
.value {
    font-size: 25px;
    color: #000;
    margin-top: 5px;
    letter-spacing: 1px;
}
.title {
    font-size: 12px;
    color: #999;
}
</style>

