<template>
  <div class="sale-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">{{$route.path === '/sale-detail' ? '销售单':'采购单'}}</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="detail-content">
        <el-row>
          <el-col :span='7'>
            <span>单据编号：{{ticketNumber}}</span>
          </el-col>
          <!-- <el-col :span='10'>
            <div>
              <span>结算方式：</span>
            </div>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>单据时间：{{ticketTime}}</span>
          </el-col>
          <el-col :span='10'>
            <span>操作员：{{customerName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <p>客户：{{consignee}}</p>
        </el-row>
        <el-row>
          <p>说明：{{description}}</p>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
const ERR_OK = "000";
import { saleDetail } from "@/api/storage/saleTicket.js";
export default {
  data() {
    return {
      tableData: [],
      ticketNumber: '',
      ticketTime: '',
      customerName: '',
      consignee: '',
      description: '',
    };
  },
  created() {
    const orderId = this.$route.query.order_id
    saleDetail(orderId)
      .then(res => {
        console.log('11', res.data.order.list)
        const detailData = res.data.order
        this.ticketNumber = detailData.inventory_record_no
        this.ticketTime = detailData.create_time
        this.customerName = detailData.member_name
        this.consignee = detailData.consignee
        this.description = detailData.description
      })
      .catch(err => {
        console.log(err);
      });
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
</style>


