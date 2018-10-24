<template>
  <div class="inventory-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">盘盈亏单</el-breadcrumb-item>
      <el-breadcrumb-item>明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="detail-content">
        <el-row>
          <el-col :span='7'>
            <span>单据编号：XY00010</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>时间筛选：2018-04-23至2018-04-29</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span='2'>
            <el-button type="warning" size="mini">批量导出</el-button>
          </el-col>
          <el-col :span='2'>
            <el-button type="warning" size="mini">打印预览</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" :header-cell-style="{background:'#e7edfd'}" border>
          <el-table-column type='index' label="序列">
          </el-table-column>
          <el-table-column prop='name' label="商品名称">
          </el-table-column>
          <el-table-column prop='name' label="条形码">
          </el-table-column>
          <el-table-column prop='name' label="分类">
          </el-table-column>
          <el-table-column prop='name' label="规格">
          </el-table-column>
          <el-table-column prop='name' label="账存数量">
          </el-table-column>
          <el-table-column prop='name' label="实际数量">
          </el-table-column>
          <el-table-column prop='name' label="盈亏数量">
          </el-table-column>
          <el-table-column prop='name' label="盈亏金额">
          </el-table-column>
          <el-table-column prop='name' label="备注">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const ERR_OK = "000";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 4,
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
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
  }
};
</script>
<style scoped >
.detail-content {
  background: #ffffff;
  padding: 30px;
  margin-top: 10px;
  font-size: 12px;
}
.el-row {
  margin-bottom: 20px;
}
.sale-detail {
  /* padding-left: 20px; */
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
</style>


