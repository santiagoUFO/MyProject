<template>
  <div class="sale-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/purchase' }">收款单</el-breadcrumb-item>
      <el-breadcrumb-item>添加收款单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class='content'>
      <el-form-item label="单据编号：">
        <span>XY00010</span>
      </el-form-item>
      <el-form-item label="收款类型：">
        <el-radio v-model="radio" label="1">货款</el-radio>
        <el-radio v-model="radio" label="2">退货</el-radio>
      </el-form-item>
      <el-form-item label="单据时间：">
        <div class="block">
          <!-- <span class="demonstration"></span> -->
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="small">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <span style="font-size: 14px;
    color: #606266;margin-right:8px;">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
        <el-radio v-model="radio" label="1">客户</el-radio>
        <el-radio v-model="radio" label="2">供应商</el-radio>
      </el-form-item>
      <el-form-item label="结算方式：">
        <el-radio v-model="radio" label="1">现金</el-radio>
        <el-radio v-model="radio" label="2">银行卡</el-radio>
      </el-form-item>
      <el-form-item>
        <span style="font-size: 14px;
    color: #606266;margin-right:8px;">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员：</span>
        <el-select v-model="value" placeholder="请选择职员" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <span style='color: #606266;float:left;text-align:center;font-size: 14px;margin-right:12px;'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：</span>
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" style="width:600px; ">
        </el-input>
      </el-form-item>
      <el-form-item label="收款金额：">
        <el-input placeholder="请输入内容" style='width:200px' size='mini'>
          <i slot="suffix" class="iconfont" >&#xe65b;</i>
        </el-input>
      </el-form-item>
      <el-button type="primary" size="mini" style="margin-top:50px;">提交保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
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
  padding: 20px 20px 150px;
  margin-top: 10px;
  font-size: 12px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
<style>
</style>



