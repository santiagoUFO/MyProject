<template>
  <div class="sale-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/storage' }">销售单</el-breadcrumb-item>
      <el-breadcrumb-item>添加销售单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col class='content'>
      <el-form ref="form" v-model="form" label-width="100px">
        <el-form-item label="单据时间：">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商：">
          <el-select v-model="form.username" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.vendor_id" :label="item.vendor_name" :value="item.vendor_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算方式：">
          <el-radio-group v-model="form.payment_type">
            <el-radio :label="3">现金</el-radio>
            <el-radio :label="6">挂账</el-radio>
            <el-radio :label="9">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.remark" style="width:50%">
          </el-input>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-table :data="tableData" ref="table" tooltip-effect="dark" border stripe :header-cell-style="{background:'#e7edfd'}">
              <el-table-column label="序列" type="index" align="center" width='60'></el-table-column>
              <el-table-column label="商品名称" align="center" prop="goods_name">
              </el-table-column>
              <el-table-column label="条形码">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.barcode" @keyup.enter.native="barCodeQuery(scope.row.barcode, scope.$index)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="分类" prop="goods_group_name">
              </el-table-column>
              <el-table-column prop="spec" label="规格">
              </el-table-column>
              <el-table-column label="单位" prop="unit">
              </el-table-column>
              <el-table-column label="数量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.goods_number"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单价" prop="goods_price">
              </el-table-column>
              <el-table-column label="金额">
                <template slot-scope="scope">
                  <el-input :value="scope.row.goods_number*scope.row.goods_price" readonly ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, scope.column)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="3">
            <el-button class="el-icon-plus" @click.prevent="addRow()" size="mini"></el-button>
            <span>添加</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="折后应收：">
              <el-input size="mini" style="width:80%" v-model="form.discounts_price">
                <i slot="suffix" class="iconfont">&#xe65b;</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="整单折扣率： ">
              <el-input size="mini" style="width:80%" v-model="form.discounts">
                <i slot="suffix" class="iconfont">&#xe682;</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="本单实收：">
            <el-input size="mini" type='text' style="width:13%" v-model="form.total_goods_price">
              <i slot="suffix" class="iconfont">&#xe65b;</i>
            </el-input>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitSave">提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { supplierList, barCodeOfGoods } from "@/api/common.js";
import { addPurchaseForm } from '@/api/storage/purchaseOrders.js'
export default {
  data() {
    return {
      value1: "",
      options: [],
      value: "",
      radio2: 3,
      textarea: "",
      tableData: [],
      form: {
        username: '',
        payment_type: '',
        remark: '',
        discounts: '',
        discounts_price: '',
        total_goods_price: '',
        json_goods: ''
      }
    };
  },
  created() {
    this.supplier();
  },
  methods: {
    async barCodeQuery(barCode, index) {
      console.log(this.form)
      this.tableData.forEach((val, index) => {
        if (!val.goods_name) {
          this.tableData.splice(index)
        }
      })
      const list = await barCodeOfGoods(barCode)
      this.$set(list.data, 'goods_number', 1)
      this.tableData.push(list.data);
    },
    // 增加行
    addRow() {
      var list = {
        goods_id: '',
        goods_name: '',
        goods_group: '',
        goods_group_name: '',
        spec: '',
        unit: '',
        goods_number: 1,
        goods_price: '2.5'
      };
      this.tableData.push(list);
    },
    async supplier() {
      const customerList = await supplierList();
      console.log(customerList)
      this.options = customerList.data
    },
    submitSave() {
      this.form.json_goods = JSON.stringify(this.tableData)
      addPurchaseForm(this.form).then(res => {
        this.$message({
          message: '添加订单成功！',
          type: 'success'
        });
      })
    },
    handleDelete(index, row, column) {
      this.tableData.splice(index, 1)
    }
  }
};
</script>
<style scoped >
.content {
  background: #fff;
  padding: 20px;
  margin-top: 10px;
  font-size: 12px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
<style>
</style>



