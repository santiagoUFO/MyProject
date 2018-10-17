<template>
  <div class="sale-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/purchase' }">采购单</el-breadcrumb-item>
      <el-breadcrumb-item>添加采购单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col class='content'>
      <el-row>
        <el-col :span='7'>
          <span>单据明细：XY00010</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="block">
            <span class="demonstration">单据时间：</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="small">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;供应商：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <template>
          <span>付款方式 :</span>
          <el-radio-group v-model="radio2">
            <el-radio :label="3">现金</el-radio>
            <el-radio :label="6">挂账</el-radio>
            <el-radio :label="9">银行卡</el-radio>
          </el-radio-group>
        </template>
      </el-row>
      <el-row>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;操作员：曹操</p>
      </el-row>
      <el-row style='position:relative'>
        <span style='position:absolute;top:50%;margin-top:-6px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说明：</span>
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" style="width:600px; margin-left:60px;">
        </el-input>
      </el-row>
      <el-row>
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
          <span>折后应收：</span>
          <el-input  size="mini" style="width:130px"></el-input>
          <span style='margin-left:100px;'>整单折扣率:</span>
          <el-input  size="mini" style="width:130px"></el-input>
      </el-row>
      <el-row>
        <span>本单实收：</span>
        <el-input size="mini" type='text' style="width:130px"></el-input>
      </el-row>
      <el-button type="primary">提交保存</el-button>
    </el-col>
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
</style>
<style>

</style>



