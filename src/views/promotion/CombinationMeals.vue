<template>
  <div class="combinations-meals">
    <el-row>套餐组合</el-row>
    <el-tabs type="border-card" class="combinationsPanel" @tab-click='tabClick'>
      <el-tab-pane label="全部">
        <tab-content></tab-content>
      </el-tab-pane>
      <el-tab-pane label="未开始">未开始</el-tab-pane>
      <el-tab-pane label="进行中">进行中</el-tab-pane>
      <el-tab-pane label="已结束">已结束</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import TabContent from './TabContent'
export default {
  methods: {
    tabClick(tab) {
      console.log(tab)
    }
  },
  components: {
    TabContent
  }
};
</script>
<style scoped>
.combinationsPanel{
  margin-top: 20px;
}
</style>


