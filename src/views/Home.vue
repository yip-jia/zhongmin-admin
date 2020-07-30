<template>
  <div>
    <el-row class="row">
      <el-col>
        <div class="inner">
          <h4 class="title">累计中民佣金</h4>
          <p class="value">{{commission}}</p>
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
import { setTimeout } from 'timers';

export default {
  created () {
    this.getTotalAll()
    this.getFinanceCharts()
  },
  mounted () {
     let _this =this
     setTimeout(function() {
        _this.myEcharts();
     },5000)
  
  },
  data() {
    return {
      totalSale:'',
      commission: '',
      commissionData:[],
      commissionDate:[]
    }
  },
  methods: {
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid:{
          left:'0', 
          right:'0', 
          top:0, 
          bottom:0,          
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.commissionDate, 
          fontSize: 4,
          axisTick: {
            show: false
          },
          show : false,
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          data: this.commissionData,
          itemStyle: {
            normal: {
              color: '#F56C6C' //改变区域颜色
            }
              
          },
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
     
    },
    async getFinanceCharts() {
      var params = {
      beginDate: '',
      endDate: '',
      channel: -1,
      selCompany: -1
    }
      let res = await this.$Http.getFinanceCharts(params)
      let total = 0
      let arry = []
      let date = []
      for(let i in res.IC) {
        total += parseInt(res.IC[i][1])
        arry.push(res.IC[i][1])
        date.push(`${parseInt(i)+1}日`)
      }
      this.commissionData = arry
      this.commissionDate = date
      this.commission = `￥${total.toLocaleString()}`
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100px;
}
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.row .el-col {
  width: 33.33%;
  padding: 20px;
  box-sizing: border-box;
}
.inner {
  background: #fff;
  padding: 20px;
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

