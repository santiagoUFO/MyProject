<template>
  <div class="sale-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">{{$route.path === '/sale-detail' ? '销售单':'采购单'}}</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24" class="detail-content">
        <el-row>
          <el-col :span='10'>
            <span>单据编号：{{ticketNumber}}</span>
          </el-col>
          <el-col :span='10'>
            <div>
              <span>结算方式：{{payment_type_name}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <span>单据时间：{{ticketTime}}</span>
          </el-col>
          <el-col :span='10'>
            <span>操作员：{{customerName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <p>供应商：{{consignee}}</p>
        </el-row>
        <el-row>
          <p>说明：{{description}}</p>
        </el-row>
        <el-table :data="tableData" :header-cell-style="{background:'#e7edfd'}" border>
          <el-table-column type='index' label="序列">
          </el-table-column>
          <el-table-column prop='goods_name' label="商品名称">
          </el-table-column>
          <el-table-column prop='name' label="条形码">
          </el-table-column>
          <el-table-column prop='goods_group_name' label="分类">
          </el-table-column>
          <el-table-column prop='spec' label="规格">
          </el-table-column>
          <el-table-column prop='unit' label="单位">
          </el-table-column>
          <el-table-column prop='purchases_number' label="数量">
          </el-table-column>
          <el-table-column prop='purchases_goods_price' label="单价">
          </el-table-column>
          <el-table-column prop='purchases_total_price' label="销售金额">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { purchaseDetail } from "@/api/storage/purchaseOrders.js";
export default {
  data() {
    return {
      tableData: [],
      ticketNumber: '',
      ticketTime: '',
      customerName: '',
      consignee: '',
      description: '',
      payment_type_name: ''
    };
  },
  created() {
    const orderId = this.$route.query.order_id
    purchaseDetail(orderId)
      .then(res => {
        console.log('11', res)
        const detailData = res.data.purchase
        this.tableData = res.data.purchases
        this.ticketNumber = detailData.purchase_no
        this.ticketTime = detailData.create_time
        this.customerName = detailData.member_name
        this.consignee = detailData.vendor_name
        this.description = detailData.remark
        this.payment_type_name = detailData.payment_type_name
      })
      .catch(err => {
        console.log(err);
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


