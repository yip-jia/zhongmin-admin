<template>
  <div class="about">
    <div>
   <el-row :gutter="10" type="flex" align="middle" > 
     <el-col :span="2.5">信息检索：</el-col>
     <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
       </el-option>
     </el-select>
     </el-col>
     <el-col :span="4"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
     <el-col :span="3"><el-button type="primary">主要按钮</el-button></el-col>
   </el-row>
   <!-- 表格 -->
   <el-row class="mt40">
       <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="index"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="ID"
      label="ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="UserName"
      label="用户名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="Email"
      label="绑定邮箱"
      width="100">
    </el-table-column>
    <el-table-column
      prop="MobilePhone"
      label="绑定手机号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="WeChatOpenID"
      label="绑定微信"
      width="100">
    </el-table-column>
    <el-table-column
      prop="RegTime"
      label="注册时间"
      width="100">
    </el-table-column>
    <el-table-column
      prop="RegType"
      label="注册类型"
      width="100">
    </el-table-column>
    <el-table-column
      prop="levelName"
      label="用户等级"
      width="100">
    </el-table-column>
    <el-table-column
      prop=""
      label="购买记录	"
      width="100"></el-table-column>
       <el-table-column
      prop=""
      label="行为日志	"
      width="100"></el-table-column>
     <el-table-column
      prop="Status"
      label="是否屏蔽	"
      width="100">
    </el-table-column>
     <el-table-column
      prop=""
      label="修改"
      width="100">
    </el-table-column>
  </el-table>
   </el-row>
  </div>
  </div>
</template>


<script>
/* import qs from 'qs' */
export default {
  created() {
     this.getUserList()
  },
  data() {
    return {
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
      value:'',
      input: '',
      tableData: []
    }
  },
  methods: {
    async getUserList() {
      let params ={
            page: 1,
            rows: 20
     }
     let res = await this.$Http.getUserList(params)
     this.tableData = res.rows
    }
  }
}
</script>


<style lang="scss" scoped>
.mt40 {
  margin-top: 40px;
}
</style>
