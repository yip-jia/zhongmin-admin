<template>
  <div>
    <el-row class="row">
      <el-col>
        <div class="inner">
          <h4 class="title">累计中民佣金</h4>
          <p class="value">{{commission}}</p>
          <echartTable ref="commissionTable"></echartTable>
        </div>
      </el-col>
      <el-col>
        <div class="inner">
          <h4 class="title">累计销售额</h4>
          <p class="value">{{sale}}</p>
          <echartTable ref="saleTable"></echartTable>
        </div>
      </el-col>
      <el-col>
        <div class="inner">
          <h4 class="title">累计销售佣金</h4>
          <p class="value">{{salecommission}}</p>
          <echartTable ref="salecommissionTable"></echartTable>
        </div>
      </el-col>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>

import echartTable from '../components/echartTable'


export default {
  components: {
    echartTable
  },
  created () {
    this.getTotalAll()
  },
  mounted () {
    let _this = this
    this.getFinanceCharts().then(()=> {
      _this.commissionEcharts();
      _this.salEcharts()
      _this.salcommissionEcharts()
    })
  },
  data () {
    return {
      totalSale: '',
      commission: '',
      commissionData: [],
      date: [],
      salecommission: '',
      salecommissionData: [],
      sale: '',
      saleData: [],
    }
  },
  methods: {
    commissionEcharts () {
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          left: '0',
          right: '0',
          top: 0,
          bottom: 0,
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.date,
          fontSize: 4,
          axisTick: {
            show: false
          },
          show: false,
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
              color: '#409EFF' //改变区域颜色
            }

          },
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.$refs.commissionTable.setOption(option);
    },
    salEcharts () {
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          left: '0',
          right: '0',
          top: 0,
          bottom: 0,
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.date,
          fontSize: 4,
          axisTick: {
            show: false
          },
          show: false,
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          data: this.saleData,
          itemStyle: {
            normal: {
              color: '#67C23A' //改变区域颜色
            }

          },
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.$refs.saleTable.setOption(option);
    },
    salcommissionEcharts () {
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          left: '0',
          right: '0',
          top: 0,
          bottom: 0,
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.date,
          fontSize: 4,
          axisTick: {
            show: false
          },
          show: false,
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
          symbol: 'none',
          data: this.salecommissionData,
          itemStyle: {
            normal: {
              color: '#F56C6C' //改变区域颜色
            }

          },
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
       this.$refs.salecommissionTable.setOption(option);
    },


    async getTotalAll () {
      var params = {
        beginTime: '2020-07-01',
        endTime: '2020-07-30',
        companyId: -1,
        statisticsType: 1,
      }
      let res = await this.$Http.getTotalAll(params)
      let tot = 0
      for (let i in res) {
        tot += parseInt(res[i]['sInsureMoney'])
      }
      this.totalSale = `￥${tot.toLocaleString()}`

    },
    async getFinanceCharts () {
      var params = {
        beginDate: '',
        endDate: '',
        channel: -1,
        selCompany: -1
      }
      let res = await this.$Http.getFinanceCharts(params)
      let ictotal = 0
      let icarry = []
      let date = []
      let smtotal = 0
      let smarry = []
      let sctotal = 0
      let scarry = []

      for (let i in res.IC) {
        ictotal += parseInt(res.IC[i][1])
        icarry.push(res.IC[i][1])
        date.push(`${parseInt(i) + 1}日`)
        console.info(new Date(res.IC[i][0]))
      }
      for (let i in res.SC) {
        sctotal += parseInt(res.SC[i][1])
        scarry.push(res.SC[i][1])
      }
      for (let i in res.SM) {
        smtotal += parseInt(res.SM[i][1])
        smarry.push(res.SM[i][1])
      }


      this.commissionData = icarry
      this.salecommissionData = smarry
      this.saleData = scarry
      this.date = date
      this.commission = `￥${ictotal.toLocaleString()}`
      this.salecommission = `￥${sctotal.toLocaleString()}`
      this.sale = `￥${smtotal.toLocaleString()}`
    }
  }
}
</script>

<style lang="scss" scoped>
#commissionTable,
#saleTable,
#salecommissionTable {
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

