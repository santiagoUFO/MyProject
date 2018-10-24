<template>
  <div class="tabContent">
    <el-row>
      <el-button type="warning" size="mini" @click='addCombinationMeals'>添加套餐</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#e7edfd'}" class="tabMargin">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="date" label="单据号">
      </el-table-column>
      <el-table-column prop="name" label="套餐名称">
      </el-table-column>
      <el-table-column prop="address" label="套餐条码">
      </el-table-column>
      <el-table-column prop="address" label="套餐价格">
      </el-table-column>
      <el-table-column prop="address" label="单据日期">
      </el-table-column>
      <el-table-column prop="address" label="开始时间">
      </el-table-column>
      <el-table-column prop="address" label="结束时间">
      </el-table-column>
      <el-table-column prop="address" label="状态">
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <span @click='handleRow(scope.$index, scope.row)'>明细</span>
          <span>删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
const ERR_OK = "000";
export default {
  props: {
    fetchData: {
      default: function() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      tableData: [],
      currentPage: 4
    };
  },
  created() {
    this.$http.get("/api/getTable").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.tableData = response.datas.slice(0, 5);
        console.log(this.tableData);
      }
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    addCombinationMeals() {
      this.$router.push({ path: "/add-meals" });
    },
    handleRow(a, b) {
      this.$router.push({ path: "/meals-detail" });
    }
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.tabMargin {
  margin-top: 20px;
}
</style>


