<template>
  <div class="meals-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/goods-return' }">套餐组合</el-breadcrumb-item>
      <el-breadcrumb-item>明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="detail-content">
        <el-row>
          <span>单据编号：XY00010</span>
        </el-row>
        <el-row>
          <span>套餐名称：2018-04-23</span>
        </el-row>
        <el-row>
          <span>套餐条码：12356</span>
        </el-row>
        <el-row>
          <span>套餐价格：00</span>
        </el-row>
        <el-row>
          <span>活动状态：进行中</span>
        </el-row>
        <el-row>
          <span>单据日期：2015-10-12</span>
        </el-row>
         <el-row>
          <span>活动日期：2015-10-12至2016-10-22</span>
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
          <el-table-column prop='name' label="单位">
          </el-table-column>
          <el-table-column prop='name' label="数量">
          </el-table-column>
          <el-table-column prop='name' label="单价">
          </el-table-column>
          <el-table-column prop='name' label="销售金额">
          </el-table-column>
        </el-table>
        <el-row class="detailButton">
          <el-button size="mini">返回</el-button>
          <el-button type="warning" size='mini'>结束</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const ERR_OK = "000";
export default {
  data() {
    return {
      tableData: []
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
  methods: {}
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
.itemOfMoney {
  margin-top: 20px;
}
.itemOfMoney span {
  margin-right: 10px;
}
.detailButton{
  margin-top: 20px;
}
</style>


