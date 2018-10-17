<template>
  <div class="stock">
    <span>货品库存</span>
    <el-form class="content">
      <el-form-item>
        <el-col :span="7">
          <span>分类：</span>
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>商品名称：</span>
          <el-input size="mini" type='text' style="width:130px"></el-input>
        </el-col>
        <el-checkbox v-model="checked" class="select">预警库存</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini">立即查询</el-button>
        <el-button type="warning" size="mini">批量导出</el-button>
        <el-button type="warning" size="mini">打印预览</el-button>
      </el-form-item>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#e7edfd'}">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="date" label="单据号">
        </el-table-column>
        <el-table-column prop="name" label="单据日期">
        </el-table-column>
        <el-table-column prop="address" label="销售客户">
        </el-table-column>
        <el-table-column prop="address" label="应售金额">
        </el-table-column>
        <el-table-column prop="address" label="折后金额">
        </el-table-column>
        <el-table-column prop="address" label="已收金额">
        </el-table-column>
        <el-table-column prop="address" label="结算">
        </el-table-column>
        <el-table-column prop="address" label="操作员工">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <!-- <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template> -->
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </el-form>
  </div>
</template>
<script>
const ERR_OK = "000";
export default {
  data() {
    return {
      checked: true,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
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
    }
  }
};
</script>
<style scoped>
.content {
  background: #fff;
  padding: 20px;
  margin-top: 10px;
}
.select {
  vertical-align: middle;
}
</style>


