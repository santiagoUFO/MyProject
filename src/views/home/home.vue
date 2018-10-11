<template>
  <!-- <el-container>
  <el-header>
    <span>首页</span>
  </el-header>
</el-container> -->
  <section class="chart-container">
    <span class='home-title'>首页</span>
    <el-row class="content">
      <el-row>
        <el-col :span='24'>
          <div class='home-top'>
            <p>云贝便利店</p>
            <p>18338331029</p>
          </div>
        </el-col>
      </el-row>
      <p class="content-title">进销存</p>
      <el-row :gutter=20 class="bottom-line">
        <el-col :span="5" :offset='1'>
          <div class="grid-content">
            <img src="../../images/first.gif" alt="">
            <p>采购单</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <img src="../../images/second.jpg" alt="">
            <p>销售单</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <img src="../../images/three.gif" alt="">
            <p>商品库存</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <img src="../../images/four.gif" alt="">
            <p>盈利状况</p>
          </div>
        </el-col>
      </el-row>
      <div class="month-statistical">
        <div class="month-statistical-title">
          <span class="content-title">本月经营统计</span>
        </div>
        <div class="block">
          <el-date-picker v-model="value4" type="month" placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
      <div class="show-section">
        <v-charts></v-charts>
      </div>
    </el-row>
  </section>
</template>
<script>
import charts from "./echarts.vue";
export default {
  data() {
    return {
      value5: 3.7,
      value4: '',
    };
  },
  components: {
    "v-charts": charts
  },
};
</script>
<style scoped>
.content {
  background: #fff;
  /* margin-right: 20px; */
  font-size: 14px;
  margin-top: 20px;
}
.home-top {
  text-align: center;
  border-bottom: 1px solid #f3f3f3;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid-content {
  border-radius: 4px;
  min-height: 147px;
  background: #d0dbfb;
  margin-bottom: 37px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
.grid-content > img {
  width: 60px;
}
.grid-content > p {
  margin-top: 24px;
}
.content-title {
  border-left: 2px solid #6288f3;
  padding-left: 20px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-top: 18px;
  margin-bottom: 23px;
  font-weight: 700;
  display: block;
}
.home-top > p {
  flex: 1;
  line-height: 30px;
}
.home-top > p:nth-of-type(1) {
  color: #333;
  font-weight: bold;
}
.chart-container {
  /* background-color: #f2f2f2; */
}
.show-section {
  margin: 10px;
  border-radius: 4px;
}

.show-section.top {
  background-color: white;
  padding: 10px;
  margin-top: 0;
}

.show-section span {
  font-weight: bold;
  font-size: 18px;
  color: #333333;
}
.el-rate {
  display: inline;
}
.home-title {
  margin: 10px;
  font-weight: 700;
}
.bottom-line {
  border-bottom: 1px solid #f3f3f3;
}
.month-statistical{
  position: relative;
}
.block{
  position: absolute;
  top:0;
  right:100px;
}
/* .block >>> .el-input__inner{
  border: 1px solid #cedcf9;
  width:190px;
  height: 30px;
}
.el-input__inner{
  border: 1px solid #cedcf9;
  width:190px;
  height: 30px;
} */
</style>
<style>
.block>div>.el-input__inner{
  border: 1px solid #cedcf9;
  width:190px;
  /* height: 30px;
  line-height:30px; */
}
</style>

