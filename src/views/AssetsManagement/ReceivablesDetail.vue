<template>
  <div class="receipt-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">应付款查询</el-breadcrumb-item>
      <el-breadcrumb-item>明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col class="receipt-detail-content">
      <el-row>
        <span>供应商：麻辣龙虾馆</span>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>期初应付：<span style="color:red;">￥1000.00</span></span>
        </el-col>
        <el-col :span="8">
          <span>本期应付：2018-04-23</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>本期已付：<span style="color:red;">￥1000.00</span></span>
        </el-col>
        <el-col :span="8">
          <span>期末未付：<span style="color:red;">￥1000.00</span></span>
        </el-col>
      </el-row>
      <el-table :data="tableData" :header-cell-style="{background:'#e7edfd'}" border style="margin-top:20px;">
        <el-table-column prop='name' label="日期">
        </el-table-column>
        <el-table-column prop='name' label="单据编号">
        </el-table-column>
        <el-table-column prop='name' label="应付金额">
        </el-table-column>
        <el-table-column prop='name' label="实付金额">
        </el-table-column>
        <el-table-column prop='name' label="剩余应付">
        </el-table-column>
        <el-table-column prop='name' label="单据类型">
        </el-table-column>
        <el-table-column prop='name' label="操作">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>
<script>
const ERR_OK = "000";
export default {
  data() {
    return {
      radio: "1",
      tableData: [],
      currentPage: 4
    };
  },
  created() {
    this.$http.get("/api/getTable").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.tableData = response.datas.slice(0, 2);
        console.log(this.tableData);
      }
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.el-row {
  margin-top: 20px;
}
.receipt-detail-content {
  background: #fff;
  padding: 20px 20px 150px;
  margin-top: 20px;
}
</style>

