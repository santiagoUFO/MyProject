<template>
  <div class="receipt-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">收款单</el-breadcrumb-item>
      <el-breadcrumb-item>明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col class="receipt-detail-content">
      <el-row>
        <span>单据明细：XY00010</span>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>收款总额：<span style="color:red;">￥1000.00</span></span>
        </el-col>
        <el-col :span="8"></el-col>
        <span>单据时间：2018-04-23</span>
      </el-row>
      <el-row>
        <span>结算方式：</span>
        <el-radio v-model="radio" label="1">银行卡</el-radio>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>收款类型：货款</span>
        </el-col>
        <el-col :span="8">
          <span>类别：供应商/客户</span>
        </el-col>
      </el-row>
      <el-row>
        <span>付款对象：对应名称</span>
      </el-row>
      <el-row>
        <span>职员：林欣</span>
      </el-row>
      <el-row>
        <span>说明：暂无</span>
      </el-row>
      <el-button size="mini" style="color:#6289f2;border: 1px solid #6289f2;margin-top:50px;">返回</el-button>

    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1'
    };
  }
};
</script>
<style scoped>
.el-row {
  margin-top: 20px;
}
.receipt-detail-content {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>

