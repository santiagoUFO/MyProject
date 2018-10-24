<template>
  <div class="add-meals">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/combination-meals' }">套餐组合</el-breadcrumb-item>
      <el-breadcrumb-item>添加套餐</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class='add-meals-content'>
      <el-form-item label="单据编号：">
        <span>XY00010</span>
      </el-form-item>
      <el-form-item label="套餐条码：">
        <span>L1323546199</span>
      </el-form-item>
      <el-form-item label="套餐名称：">
        <el-input placeholder="请输入套餐名称" style='width:300px' size='mini'></el-input>
      </el-form-item>
      <el-form-item label="套餐价格：">
        <el-input placeholder="请输入内容" style='width:200px' size='mini'>
          <i slot="suffix" class="iconfont" N>&#xe65b;</i>
        </el-input>
      </el-form-item>
      <el-form-item label="开始日期：">
        <el-col :span='8'>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" style="width:200px">
          </el-date-picker>
        </el-col>
        <el-col :span='10'>
          <el-form-item label="结束日期：">
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" size="mini" style="width:200px">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="returnTab">
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
      </el-form-item>
      <el-form-item class="mealsButton">
        <el-button size="mini">返回</el-button>
        <el-button type="primary" size="mini">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      tableData: []
    };
  },
  methods: {
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
<style scoped>
.add-meals-content {
  background: #ffffff;
  padding-left: 20px;
  padding-bottom: 50px;
  margin-top: 20px;
}
.returnTab {
  margin-top: 20px;
}
.mealsButton{
  margin-top: 60px;
}
</style>
<style>
.el-form-item {
  margin-bottom: 10px;
}
</style>



