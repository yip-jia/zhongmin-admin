<template>
  <div>
    <div>
      <el-row :gutter="10"
              type="flex"
              align="middle">
        <el-col :span="2.5">信息检索：</el-col>
        <el-col :span="4">
          <el-select v-model="value"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input"
                    placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">主要按钮</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-row class="mt40 row">
        <el-table :data="tableData"
                  class="table"
                  :height="height"
                  border
                  style="width: 100%">
          <el-table-column prop="index"
                           label=""
                           width="50">
          </el-table-column>
          <el-table-column prop="ID"
                           label="ID"
                           width="100">
          </el-table-column>
          <el-table-column prop="UserName"
                           label="用户名"
                           width="100">
          </el-table-column>
          <el-table-column prop="Email"
                           label="绑定邮箱"
                           width="100">
          </el-table-column>
          <el-table-column prop="MobilePhone"
                           label="绑定手机号"
                           width="100">
          </el-table-column>
          <el-table-column prop="WeChatOpenID"
                           label="绑定微信"
                           width="100">
          </el-table-column>
          <el-table-column prop="RegTime"
                           label="注册时间"
                           width="100">
          </el-table-column>
          <el-table-column prop="RegType"
                           label="注册类型"
                           width="100">
          </el-table-column>
          <el-table-column prop="levelName"
                           label="用户等级"
                           width="100">
          </el-table-column>
          <el-table-column label="购买记录"
                           width="100">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </el-table-column>
          <el-table-column label="行为日志	"
                           width="100">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </el-table-column>
          <el-table-column prop="Status"
                           label="是否屏蔽	"
                           width="100">
          </el-table-column>
          <el-table-column prop=""
                           label="修改"
                           width="100">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 30]"
                       :page-size="pagesize"
                       layout="sizes, prev, jumper, next,total"
                       :total="600">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>


<script>
/* import qs from 'qs' */
export default {
  computed: {
    height () {
      return window.innerHeight - 268
    }
  },
  created () {
    this.getUserList()
  },
  data () {
    return {
      pagesize:20,
      currentpage:1,
      page:'',
      options: [{
        value: -1,
        label: '不限'
      }, {
        value: 0,
        label: '用户名'
      }, {
        value: 1,
        label: '绑定邮箱'
      }, {
        value: 2,
        label: '绑定手机号'
      }, {
        value: 3,
        label: '注册类型'
      },
      {
        value: 4,
        label: '证件号'
      }
      ],
      value: '',
      input: '',
      tableData: []
    }
  },
  methods: {
    async getUserList (page=1, rows=20,searchType,searchTxt) {
      let params = {
        page: page,
        rows: rows,
        searchType:searchType,
        searchTxt:searchTxt,
      }
      let res = await this.$Http.getUserList(params)

      for (let i = 0; i < res.rows.length; i++) {
        for (let key in res.rows[i]) {
          res.rows[i].index = this.pagesize*this.currentpage - this.pagesize+i+1
          if (key == 'RegTime') {
            res.rows[i][key] = this.Nums(res.rows[i][key])
          }
        }
      }
      this.tableData = res.rows
    },
    Nums (str) {
      let res = str.replace(/[^0-9]/ig, "");
      return this.formatDate(res)
    },
    formatDate (str) {
      let now = new Date(parseInt(str))
      var year = now.getFullYear();  //取得4位数的年份
      var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate();      //返回日期月份中的天数（1到31）
      var hour = now.getHours();     //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    /* 显示条数更改 */
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getUserList(this.currentpage, pagesize)
    },
    /* 第几页更改 */
    handleCurrentChange (currentpage) {
      this.currentpage = currentpage
      this.getUserList(currentpage,this.pagesize)
    }

  }
}
</script>


<style lang="scss" scoped>
.mt40 {
  margin-top: 40px;
}
</style>
