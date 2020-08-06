<template>
  <div>
    <el-row class="row">
      <el-col>
        <el-card >
          <h4 class="title">累计中民佣金</h4>
          <p class="value">{{commission}}</p>
            <echartTable ref="commissionTable" :eStyle="eStyle"></echartTable>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <h4 class="title">累计销售额</h4>
          <p class="value">{{sale}}</p>
          <echartTable ref="saleTable" :eStyle="eStyle"></echartTable>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <h4 class="title">累计销售佣金</h4>
          <p class="value">{{salecommission}}</p>
          <echartTable ref="salecommissionTable" :eStyle="eStyle"></echartTable>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
    <el-card>
    <div slot="header" class="clearfix">
       <span>分类销售排行</span>
       <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          value-format="yyyy-MM-dd"
          style="float:right"
          @blur="changeDate"
          :picker-options="pickerOptions">
       </el-date-picker>
    </div>
  <el-row class="prolist">
    <el-col>
      <echartTable ref="pieTable" :eStyle="pStyle"></echartTable>
    </el-col>
    <el-col>
      <div class="sales-view-title">排行榜</div>
      <ul class="ullist">
        <li class="listitem" v-for="(item, index) in productsort" :key="index" >
          <span class="listleft">{{index+1}}</span>
          <span class="listcenter">{{item.name}}</span>
          <span class="listright">{{item.value}}单</span>
        </li>
      </ul>
    </el-col>
  </el-row>
     </el-card>
    </el-row>
  </div>
</template>

<script>

import echartTable from '../components/echartTable'
import { formatDate } from '../assets/js/util.js'

export default {
  components: {
    echartTable
  },
  created () {
  },
  mounted () {
    let _this = this
    this.getFinanceCharts().then(()=> {
      _this.commissionEcharts();
      _this.salEcharts()
      _this.salcommissionEcharts()
    })
    this.getTotalAll(this.dateValue).then(()=> {
      _this.productionEcharts()
    })
  },
  data () {
    return {
      eStyle: {
        height:'80px'
      },
      pStyle: {
        width:'600px',
        height:'400px'
      },
      dateValue: [formatDate(),formatDate()],
      totalSale: '',
      commission: '',
      commissionData: [],
      date: [],
      salecommission: '',
      salecommissionData: [],
      sale: '',
      saleData: [],
      productsort:[],
      productsortTip:[],
       pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
       }
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
    productionEcharts() {
      let option = {
          tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>数量:{c}(单)<br/>占比:{d}%'
          },
           title: {
            text: '产品销售分类',
            left: 120,
            top: 0,
            textStyle: {
            color: '#333'
        }
          },
          legend: {
              orient: 'vertical',
              right: 70,
              data: this.productsortTip,
              
          },
          series: [
              {
                  name: '销售单数',
                  type: 'pie',
                  radius: ['40%', '60%'], // 大小内圈和外圈
                  center: ['30%', '50%'], // 饼图的位置左， 上
                  avoidLabelOverlap: false,
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '20',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: this.productsort
              }
          ]
      }       
      this.$refs.pieTable.setOption(option)
    },

    async getTotalAll (date) {
      var params = {
        beginTime: date[0],
        endTime: date[1],
        companyId: -1,
        statisticsType: 1,
      }
      let res = await this.$Http.getTotalAll(params)
      let arry = []
      let tips = []
      for (let i in res) {
        arry[i] = {
          'value':  res[i].cntReal,
          'name' : `${res[i].BID}(${res[i].ProPolicyType})`
        }
        tips[i] = `${res[i].BID}(${res[i].ProPolicyType})`
      }
      this.productsort = arry.sort(this.compare('value'))
      this.productsortTip = tips
      
    },
    compare (property) { // 根据数组中对象的某一个属性值进行排序
        return function(a,b){
        let value1 = a[property];
        let value2 = b[property];
        return value2 - value1;
        }
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
        date.push(formatDate(res.IC[i][0]))
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
      this.salecommissionData = scarry
      this.saleData = smarry
      this.date = date
      this.commission = `￥${ictotal.toLocaleString()}`
      this.salecommission = `￥${sctotal.toLocaleString()}`
      this.sale = `￥${smtotal.toLocaleString()}`
    },
    changeDate() {
      let _this =this
      this.getTotalAll(this.dateValue).then(()=> {
      _this.productionEcharts()
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.row .el-col {
  width: 33.33%;
  padding: 0 20px 20px;
  box-sizing: border-box;
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
.prolist {
  display: flex;
}
.sales-view-title {
  margin: 0 0 20px;
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.listitem {
  display: flex;
  justify-content: flex-start;
}
.ullist li {
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 20px;
  padding: 6px 20px 6px 0;
  box-sizing: content-box;
}
.listleft {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: #333;
}
.listright {
  flex: 1;
  text-align: right;
}
.ullist li:nth-child(1) .listleft,
.ullist li:nth-child(2) .listleft,
.ullist li:nth-child(3) .listleft {
  background: #0076cd;
  border-radius: 50%;
  color: #fff;
  font-weight: 500;
}
</style>

