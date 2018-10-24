<template>
  <div class="add-goods-return">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/purchase' }">退货单</el-breadcrumb-item>
      <el-breadcrumb-item>添加退货单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class='content'>
      <el-form-item>
        <el-radio v-model="checkRadio" label="1">买家退货</el-radio>
        <el-radio v-model="checkRadio" label="2">退货给供应商</el-radio>
      </el-form-item>
      <el-form-item label="单据编号：">
        <span>XY00010</span>
      </el-form-item>
      <el-form-item label="单据时间：">
        <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算方式：">
        <el-radio-group v-model="radio2">
          <el-radio :label="3">现金</el-radio>
          <el-radio :label="6">挂账</el-radio>
          <el-radio :label="9">银行卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="操作员：" class="operator">
        <span>张佳怡</span>
      </el-form-item>
      <el-form-item label="说明：" class="explain">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" style="width:600px;">
        </el-input>
      </el-form-item>
      <el-row class="returnTab">
        <el-col :span="20">
          <el-table :data="tableData" ref="table" tooltip-effect="dark" border stripe :header-cell-style="{background:'#e7edfd'}">
            <el-table-column label="序列" type="index" align="center" width='60'></el-table-column>
            <el-table-column label="商品名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="条形码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="分类">
              <template slot-scope="scope">
                <el-input v-model="scope.row.loveer"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="规格">
              <template slot-scope="scope">
                <el-input v-model="scope.row.weather"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <el-input v-model="scope.row.phone"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.date"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.mdate"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="scope">
                <el-input></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, scope.column)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-col>
        <el-col :span='3' :offset='1'>
          <el-button class="el-icon-plus" @click.prevent="addRow()" size="mini"></el-button>
          <span>添加</span>
        </el-col>
      </el-row>
      <el-row>
        <span>应退金额：</span>
        <el-input size="mini" style="width:130px"></el-input>
        <span style='margin-left:100px;'>实退金额:</span>
        <el-input size="mini" style="width:130px"></el-input>
      </el-row>
      <el-button type="primary" size="mini">提交保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      checkRadio: "1",
      value: "",
      radio2: 3,
      textarea: "",
      tableData: []
    };
  },
  methods: {
    // 增加行
    addRow() {
      var list = {
        rowNum: "",
        address: this.address,
        name: this.name,
        weather: this.weather,
        phone: this.phone,
        date: this.date,
        mdate: this.mdate,
        loveer: this.loveer
      };
      this.tableData.push(list);
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
.returnTab{
  margin-top: 20px;
}
.operator{
  margin-left: 12px;
}
.explain{
  margin-left: 25px;
}
</style>
<style>
.add-goods-return .el-form-item {
  margin-bottom: 0;
}
</style>



