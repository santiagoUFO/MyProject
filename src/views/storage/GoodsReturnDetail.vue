<template>
  <div class="goods-return-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/goods-return' }">退货单</el-breadcrumb-item>
      <el-breadcrumb-item>明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="detail-content">
        <el-row>
          <el-col :span='7'>
            <span>单据明细：XY00010</span>
          </el-col>
          <el-col :span='10'>
            <span>对应单据：XY00010</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>单据时间：2018-04-23</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户：零售客户</p>
          </el-col>
          <el-col :span='10'>
            <span>结算方式：</span>
          </el-col>
        </el-row>
        <el-row>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;操作员: 林峰</p>
        </el-row>
        <el-row><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说明：暂无</p></el-row>
        <el-table :data="tableData" :header-cell-style="{background:'#e7edfd'}" border >
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
        <el-row class="itemOfMoney">
          <span>应退金额：<span style="fontWeight:700">￥1600</span></span>
          <span>实退金额：<span style="fontWeight:700">￥1600</span></span>
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
      tableData: [],
    }
  },
  created() {
    this.$http.get("/api/getTable").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.tableData = response.datas.slice(0, 2);
        console.log(this.tableData)
      }
    });
  },
  methods: {

  }

};
</script>
<style scoped >
.detail-content{
  background: #ffffff;
  padding:30px;
  margin-top:10px;
  font-size: 12px;
}
.el-row{
  margin-bottom: 20px;
}
.sale-detail{
  /* padding-left: 20px; */
}
.itemOfMoney{
  margin-top: 20px;
}
.itemOfMoney span{
  margin-right:10px;
}
</style>


